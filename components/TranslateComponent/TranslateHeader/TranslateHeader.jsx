import { Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

export const TranslateHeader = () => {
  return (
    <LinearGradient colors={["#3585BD", "#6CAEE7"]} style={styles.header}>
      <AntDesign name="arrowleft" color={"white"} size={20}></AntDesign>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: "20",
          }}
        >
          New Granding Standart
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 57,
    paddingBottom: 17,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
