import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import AdviceCard from "../components/advice-card";
import GenerateButton from "../components/GenerateButton";
import { AdviceContext } from "../constants/adviceContext";
import colors from "../theme/colors";

export default function HomeScreen({ navigation }: any) {
  const { advice, loading, generateAdvice, saveCurrentAdvice } =
    useContext(AdviceContext);

  return (
    <View style={styles.container}>
      <View style={styles.shadowBox} />
      <Ionicons name="heart" style={
        { position: "absolute", 
          top: 10, 
          right: 10, 
          transform: "translate(-50%, -50%)" 
        }} 
        size={24} color={"#8d8d8dff"} />
      <AdviceCard id={advice.id} text={advice.text} />
      <GenerateButton onPress={generateAdvice} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  shadowBox: {
    backgroundColor: "#00A86B",
    position: "absolute",
    top: 1 / 2,
    left: 1 / 2,
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});