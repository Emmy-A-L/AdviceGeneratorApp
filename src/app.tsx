// import React from "react";
import { AdviceProvider } from "./constants/adviceContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AdviceProvider>
      <AppNavigator />
    </AdviceProvider>
  );
}