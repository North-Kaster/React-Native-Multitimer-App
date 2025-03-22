import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Shared";
import TimerComponent from "./TimerComponent";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useTimerContext } from "./timerContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, Timer } from "./Types";
import { LinearGradient } from "expo-linear-gradient";

type TimerSetViewProps = StackScreenProps<RootStackParamList, "TimerSetView">;
export default function TimerSetView({ route }: TimerSetViewProps) {
  const { TimerCollectionId } = route.params;
  const { timerCollectionList, addTimer } = useTimerContext();

  const selectedTimerCollection = timerCollectionList.find(
    (collection) => collection.collectionId === TimerCollectionId,
  );

  if (!selectedTimerCollection) {
    return;
  }
  return (
    <View style={[styles.screenBackground]}>
      <LinearGradient
        colors={["#140B35", "#3f0072"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.screenBackground}
      >
        <View style={styles.center}>
          <Text style={[styles.titleText]}>
            {selectedTimerCollection.collectionName}
          </Text>
        </View>
        <View style={[styles.backgroundContainer]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {selectedTimerCollection.timerCollection.map((timer: Timer) => (
              <TimerComponent
                key={timer.id}
                timerData={timer}
                TimerCollectionId={TimerCollectionId}
              />
            ))}
          </ScrollView>
          <View>
            <TouchableOpacity
              onPress={() =>
                addTimer(TimerCollectionId, {
                  id: uuidv4(),
                  name: "New Timer",
                  duration: 30,
                  state: "stopped",
                })
              }
            >
              <View style={[styles.standardButton]}>
                <Text style={styles.standardTimerText}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
