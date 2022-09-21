import { Text, TouchableHighlight, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { StyleSheet } from "react-native";
import { TranslateHeader } from "./TranslateHeader/TranslateHeader";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const TranslateComponent = () => {
  const [data, setData] = useState({ sentences: [], name: "" });
  const [activeIndex, setActiveIndex] = useState(null);
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = ["40%"];

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          "https://dictionary-api-development.ponddy.com/api/v1/grammars/grammar/20",
          {
            headers: {
              Cookie: "sessionid=ba9pzdtbp91hfkqi91blljl357e6ybzh",
              Authorization:
                "SSO eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Iml2YW4ubnVrb2xAcGVjb2Rlc29mdHdhcmUuY29tNjM4MiIsImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOiIiLCJpbWFnZSI6Imh0dHBzOi8vcG9uZGR5LWF1dGgtZGV2ZWxvcC5zMy5hbWF6b25hd3MuY29tL3N0YXRpYy91c2VyLWltYWdlcy84OTg2Mjg2OS1lNDg5LTQzMGItOTg1Zi0yNGZhNzMzYWQwMTYucG5nPzE2NTkzNDQwNzkiLCJlbWFpbCI6Iml2YW4ubnVrb2xAcGVjb2Rlc29mdHdhcmUuY29tIiwidGltZSI6IjE2NTkzNDQwNzkuOTg1NzM2NCIsImFwaSI6IjIzOGRjYzNkLTgyMWQtNDlkMi1hYjhjLTQwZmRkM2ZmOWRiMSIsInV1aWQiOiI4OTg2Mjg2OS1lNDg5LTQzMGItOTg1Zi0yNGZhNzMzYWQwMTYiLCJsYXN0X3NvdXJjZSI6bnVsbCwicmVhbF9lbWFpbCI6bnVsbH0.VOfUPJoybMIja5i12BsCvxRwsmltnle6d5BwoXbN3UQ",
            },
          }
        )
        .then((res) => {
          setData(res.data);
        });
    };

    fetch();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <TranslateHeader />
      <View style={styles.body}>
        <Text style={{ color: "#969CA0", fontSize: 18 }}>{data?.name}</Text>
        <View style={styles.translateWrapper}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              {data?.sentences[0]?.simp.split(" ").map((item, key) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      padding: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <FontAwesome
                      onPress={() => bottomSheetRef.current?.close()}
                      name="anchor"
                      color={"#6ACFED"}
                      size={20}
                    ></FontAwesome>
                    <Text
                      style={
                        key === activeIndex
                          ? {
                              padding: 10,
                              fontSize: "20",
                              borderWidth: 1,
                              borderRadius: 12,
                              borderColor: "#6ACFED",
                              marginTop: 10,
                            }
                          : {
                              padding: 10,
                              fontSize: "20",
                              marginTop: 10,
                            }
                      }
                      onPress={() => setActiveIndex(key)}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Button title="Show"></Button>
            <Button
              onPress={() => bottomSheetRef.current?.snapToIndex(0)}
              title="Show"
            ></Button>
          </View>
        </View>
      </View>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={{ paddingHorizontal: 26 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <AntDesign
              onPress={() => bottomSheetRef.current?.close()}
              name="close"
              color={"black"}
              size={20}
            ></AntDesign>
          </View>
          <Text
            style={{ textAlign: "center", borderBottom: "1px solid #F5F5F5" }}
          >
            Vocabulary
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 16,
  },
  translateWrapper: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
  },
});
