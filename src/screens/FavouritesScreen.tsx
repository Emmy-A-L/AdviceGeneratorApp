import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getFavourites, removeFavourite } from "../storage/CacheService";
import { AdviceCardProps } from "../components/advice-card";
import colors from "../theme/colors";

// ─── Individual favourite row ─────────────────────────────────────────────────
function FavouriteItem({
  item,
  onRemove,
}: {
  item: AdviceCardProps;
  onRemove: (id: number) => void;
}) {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onRemove(item.id!));
  };

  return (
    <Animated.View style={[styles.itemCard, { opacity: fadeAnim }]}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemLabel}>ADVICE #{item.id}</Text>
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          accessibilityLabel={`Delete advice ${item.id}`}
          style={styles.deleteBtn}
        >
          <Ionicons name="trash-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>"{item.text}"</Text>
    </Animated.View>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.emptyWrapper}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="heart" size={32} color={colors.textSecondary} />
      </View>
      <Text style={styles.emptyTitle}>No favourites yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the heart icon on any advice to save it{"\n"}here for later.
      </Text>
      <TouchableOpacity
        style={styles.discoverBtn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.discoverBtnText}>Discover Advice</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function FavouritesScreen() {
  const [favourites, setFavourites] = useState<AdviceCardProps[]>([]);

  // Reload every time the tab gains focus
  useFocusEffect(
    useCallback(() => {
      getFavourites().then(setFavourites);
    }, [])
  );

  const handleRemove = async (id: number) => {
    await removeFavourite(id);
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.appLabel}>ADVICE GENERATOR</Text>
        <View style={styles.titleRow}>
          <Ionicons name="heart" size={26} color={colors.primary} style={{ marginRight: 8 }} />
          <Text style={styles.title}>Your Favourites</Text>
        </View>
        <Text style={styles.savedCount}>
          {favourites.length} saved advice{favourites.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* ── List or empty state ── */}
      {favourites.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FavouriteItem item={item} onRemove={handleRemove} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  appLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    color: "#ffffff",
    fontSize: 26,
    fontFamily: "Manrope",
    fontWeight: "800",
  },
  savedCount: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  // Empty state
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
    marginBottom: 60,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2a3242",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Manrope",
    fontWeight: "800",
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  discoverBtn: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
  discoverBtnText: {
    color: "#1a2332",
    fontSize: 16,
    fontFamily: "Manrope",
    fontWeight: "800",
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 12,
  },

  // Favourite card row
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 18,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemLabel: {
    color: colors.primary,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: "Manrope",
  },
  deleteBtn: {
    padding: 4,
  },
  itemText: {
    color: colors.textQuotes,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Manrope",
  },
});