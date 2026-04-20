// import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function AdviceCard({ text }: { text: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  text: {
    textAlign: "center",
    color: colors.text,
    fontSize: 16,
  },
});