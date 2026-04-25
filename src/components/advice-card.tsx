import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../main/theme/colors";

export type AdviceCardProps = {
  id?: number;
  text?: string;
  onSave?: () => void;
};

const Divider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.line} />
    <View style={styles.pauseIconContainer}>
      <View style={styles.pauseBar} />
      <View style={styles.pauseBar} />
    </View>
    <View style={styles.line} />
  </View>
);

export default function AdviceCard({ id, text, onSave }: AdviceCardProps) {
  const [saved, setSaved] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Reset saved state whenever a new advice is shown
  useEffect(() => {
    setSaved(false);
  }, [id]);

  const handleSave = () => {
    // Spring pop animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.45,
        useNativeDriver: true,
        speed: 50,
        bounciness: 14,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 8,
      }),
    ]).start();

    setSaved(true);
    onSave?.();
  };

  return (
    <View style={styles.card}>
      {/* Heart save button — top-left */}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={handleSave}
        activeOpacity={0.7}
        accessibilityLabel="Save advice"
        disabled={saved}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={22}
            color={saved ? "#ff6b81" : colors.textSecondary}
          />
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.adviceID}>ADVICE #{id}</Text>
      <Text style={styles.quoteText}>"{text}"</Text>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 64,
    borderRadius: 16,
    width: "100%",
    maxWidth: 540,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  heartButton: {
    position: "absolute",
    top: 14,
    right: 16,
    padding: 6,
    zIndex: 10,
  },
  adviceID: {
    fontFamily: "Manrope",
    color: colors.primary,
    fontSize: 13,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 24,
  },
  quoteText: {
    fontFamily: "Manrope",
    color: colors.textQuotes,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 32,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  pauseIconContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 8,
  },
  pauseBar: {
    width: 6,
    height: 16,
    backgroundColor: colors.textQuotes,
    borderRadius: 3,
  },
});