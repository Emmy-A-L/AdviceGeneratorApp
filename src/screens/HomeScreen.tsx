import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import AdviceCard from "../components/advice-card";
import GenerateButton from "../components/GenerateButton";
import { AdviceContext } from "../constants/adviceContext";
import colors from "../theme/colors";
import { Text } from "react-native";

export default function HomeScreen({ navigation }: any) {
  const { advice, loading, generateAdvice, saveCurrentAdvice } = useContext(AdviceContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>ADVICE GENERATOR</Text>
        <AdviceCard
          id={advice?.id}
          text={advice?.text || "..."}
          onSave={saveCurrentAdvice}
        />
        <GenerateButton onPress={generateAdvice} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    position: "absolute",
    top: 30,
    marginHorizontal: "auto",
    color: colors.primary,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: "Manrope",
  },
});