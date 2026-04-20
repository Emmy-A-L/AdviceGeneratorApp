import React, { useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import { AdviceContext } from "../constants/adviceContext";
import AdviceCard from "../components/advice-card";
import GenerateButton from "../components/GenerateButton";
import colors from "../theme/colors";

export default function HomeScreen({ navigation }: any) {
  const { advice, loading, generateAdvice, saveCurrentAdvice } =
    useContext(AdviceContext);

  return (
    <View style={styles.container}>
      <AdviceCard text={advice} />
      <GenerateButton onPress={generateAdvice} loading={loading} />
      <Button title="Save" onPress={saveCurrentAdvice} />
      <Button
        title="Favourites"
        onPress={() => navigation.navigate("Favourites")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});