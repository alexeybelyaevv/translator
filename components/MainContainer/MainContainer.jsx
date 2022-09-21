import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { TranslateComponent } from "../TranslateComponent/TranslateComponent";

export const MainContainer = () => {
  return (
    <View style={styles.mainContainer}>
      <TranslateComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
