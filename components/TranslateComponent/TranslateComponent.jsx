import { Text, TouchableHighlight, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { Audio } from "expo-av";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { StyleSheet } from "react-native";
import { TranslateHeader } from "./TranslateHeader/TranslateHeader";
import axios from "axios";

export const TranslateComponent = () => {
  async function playSound(soundUri) {
    const { sound } = await Audio.Sound.createAsync({
      uri: soundUri,
    });
    await sound.playAsync();
  }

  const [data, setData] = useState({
    sentences: [{ segments: [], voice: "" }],
    name: "",
  });
  const [activeIndex, setActiveIndex] = useState(null);
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = ["40%"];

  useEffect(() => {
    bottomSheetRef.current.close();
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
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <AntDesign
                name="sound"
                size="20"
                style={{ marginTop: 42 }}
                color="#969CA0"
                onPress={() => playSound(data?.sentences[0]?.voice)}
              />
              {data?.sentences[0]?.segments.map((item, key) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    key={key}
                  >
                    <FontAwesome
                      onPress={() => bottomSheetRef.current?.close()}
                      name="anchor"
                      color={item.anchor ? "#6ACFED" : "#fff"}
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
                              color: "levels" in item ? "black" : "grey",
                            }
                          : {
                              padding: 10,
                              fontSize: "20",
                              color: "levels" in item ? "black" : "grey",
                              marginTop: 10,
                            }
                      }
                      onPress={() => {
                        if ("levels" in item && activeIndex !== key) {
                          bottomSheetRef.current?.snapToIndex(0);
                          setActiveIndex(key);
                        } else if ("levels" in item && activeIndex === key) {
                          bottomSheetRef.current?.close();
                          setActiveIndex(null);
                        }
                      }}
                    >
                      {item.word}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "#969CA0",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#969CA0" }}>
                {data?.sentences[0]?.trans}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <FontAwesome
                onPress={() => bottomSheetRef.current?.close()}
                name="anchor"
                color="#6ACFED"
                size={12}
              ></FontAwesome>
              <Text
                style={{ color: "#969CA0", fontSize: 18, marginHorizontal: 8 }}
              >
                Key words:
              </Text>
              <Text style={{ color: "#969CA0", fontSize: 18 }}>
                {data?.sentences[0].segments
                  .filter((item) => item.anchor)
                  .map((item) => item.word)
                  .join("")}
              </Text>
            </View>
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
            style={{
              textAlign: "center",
              borderBottomWidth: 1,
              borderColor: "black",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Vocabulary
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginTop: 8,
              borderColor: "#f1f1f1",
            }}
          ></View>
          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 30 }}>
                {data?.sentences[0]?.segments[activeIndex]?.word}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo name="bookmark" color="#FCC811" size="30"></Entypo>
              <View style={styles.moreButton}>
                <Text style={{ color: "white" }}>More</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <AntDesign
              name="sound"
              size="20"
              color="#969CA0"
              onPress={() => playSound(data?.sentences[0]?.voice)}
            />
            <Text style={{ marginLeft: 10, color: "#969CA0" }}>
              Pronounce from api
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View
              style={
                //switch case from level of difficulty.
                { backgroundColor: "#E4E900", borderRadius: 12, padding: 8 }
              }
            >
              <Text style={{ color: "white" }}>LVL 1</Text>
              {/* level hsk??? */}
            </View>
            <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
              {data?.sentences[0]?.segments[activeIndex]?.pos[0]}.
            </Text>
            <Text style={{ fontSize: 20 }}>
              {data?.sentences[0]?.segments[activeIndex]?.word}
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>Translate</Text>
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
    borderRadius: 18,
    padding: 12,
    marginTop: 20,
  },
  moreButton: {
    backgroundColor: "#6ACFED",
    padding: 10,
    fontSize: 20,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
});
