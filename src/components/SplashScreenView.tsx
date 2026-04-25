import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../main/theme/colors";

const { width } = Dimensions.get("window");

export default function SplashScreenView() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Then fade in the text
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Subtle radial glow behind logo */}
      <View style={styles.glowCircle} />

      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require("../assets/images/main-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.textBlock, { opacity: textFadeAnim }]}>
        <Text style={styles.appName}>Advice Generator</Text>
        <Text style={styles.tagline}>
          Unlock a world of thoughtful advice,{"\n"}one tap at a time.
        </Text>
      </Animated.View>

      {/* Bottom loading dots */}
      <Animated.View style={[styles.dotsRow, { opacity: textFadeAnim }]}>
        <BouncingDot delay={0} />
        <BouncingDot delay={150} />
        <BouncingDot delay={300} />
      </Animated.View>
    </View>
  );
}

function BouncingDot({ delay }: { delay: number }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.delay(300 - delay),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[styles.dot, { transform: [{ translateY: bounceAnim }] }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  glowCircle: {
    position: "absolute",
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: colors.primary,
    opacity: 0.06,
    top: "25%",
    alignSelf: "center",
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logo: {
    width: 130,
    height: 130,
  },
  textBlock: {
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  tagline: {
    fontSize: 14,
    color: colors.textQuotes,
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.85,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 52,
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    opacity: 0.7,
  },
});
