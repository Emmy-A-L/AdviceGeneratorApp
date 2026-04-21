import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function GenerateButton({ onPress, loading }: { onPress: () => void, loading: boolean }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
      spinValue.setValue(0);
    }
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="dice" size={28} color="black" />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    width: 60,
  },
  text: {
    color: "#000",
    fontWeight: "bold",
  },
});