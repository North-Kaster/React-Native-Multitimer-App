import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Shared";
import { useTimerContext } from "./timerContext";
import { RootStackParamList } from "./Types";
import { TimerCollectionItemView } from "./TimerCollectionItemView";
import { StackScreenProps } from "@react-navigation/stack";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { LinearGradient } from "expo-linear-gradient";

type TimerCollectionViewProps = StackScreenProps<
  RootStackParamList,
  "TimerCollections"
>;

export function TimerCollectionView({ navigation }: TimerCollectionViewProps) {
  console.log(`timerCollectionView rendered`);

  const { timerCollectionList, addTimerCollection } = useTimerContext();

  const handleViewTimerCollection = (id: string) => {
    navigation.navigate("TimerSetView", {
      TimerCollectionId: id,
    });
  };

  return (
    <View style={[styles.screenBackground]}>
      <LinearGradient
        colors={["#140B35", "#3f0072"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.screenBackground}
      >
        <View style={[styles.backgroundContainer]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {timerCollectionList.map((timerCollection) => (
              <TimerCollectionItemView
                key={timerCollection.collectionId}
                timerCollectionData={timerCollection}
                onView={handleViewTimerCollection}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              addTimerCollection({
                collectionId: uuidv4(),
                collectionName: "New Collection",
                timerCollection: [],
              })
            }
          >
            <View style={[styles.standardButton]}>
              <Text style={styles.standardTimerText}>Add</Text>
            </View>
          </TouchableOpacity>

          <View />
        </View>
      </LinearGradient>
    </View>
  );
}
