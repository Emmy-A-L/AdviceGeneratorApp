import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import colors from "../theme/colors";

export default function GenerateButton({ onPress, loading }: { onPress: () => void, loading: boolean }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>Generate Advice</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 40,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});