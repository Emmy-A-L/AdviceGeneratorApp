import React, { useEffect, useState } from "react";
import { useFonts, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen";
import { AdviceProvider } from "./constants/adviceContext";
import AppNavigator from "./navigation/AppNavigator";
import SplashScreenView from "./components/SplashScreenView";

// Minimum time (ms) the custom splash is guaranteed to be visible
const MIN_SPLASH_MS = 5000;

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope: Manrope_800ExtraBold,
  });
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Dismiss the native Expo splash immediately on mount —
  // our custom SplashScreenView takes over from here
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Start minimum-display countdown on mount
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_SPLASH_MS);
    return () => clearTimeout(timer);
  }, []);

  // Show custom splash until fonts AND minimum time are both ready
  if (!fontsLoaded || !minTimeElapsed) {
    return <SplashScreenView />;
  }

  return (
    <AdviceProvider>
      <AppNavigator />
    </AdviceProvider>
  );
}