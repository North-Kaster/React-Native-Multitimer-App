import { StatusBar } from "expo-status-bar";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { styles } from "./Shared";
import { useTimerContext } from "./timerContext";
import { Timer } from "./Types";
import { LinearGradient } from "expo-linear-gradient";

export default function TimerComponent({
  timerData,
  TimerCollectionId,
}: {
  timerData: Timer;
  TimerCollectionId: string;
}) {
  console.log("TimerComponent.tsx start");
  console.log(`${timerData.name} is ${timerData.state}`);

  const { removeTimer, editTimer } = useTimerContext();

  const [timerState, setTimerState] = useState(timerData.state);
  const [defaultTimerValue, setDefaultTimerValue] = useState(
    timerData.duration,
  );
  const [currentTimerValue, setCurrentTimerValue] = useState(defaultTimerValue);

  const initialTimerValue = new Date(1000 * timerData.duration)
    .toISOString()
    .substring(11, 19);
  const arr = initialTimerValue.split(":");

  const [editedHours, setEditedHours] = useState(parseInt(arr[0]).toString());
  const [editedMinutes, setEditedMinutes] = useState(
    parseInt(arr[1]).toString(),
  );
  const [editedSeconds, setEditedSeconds] = useState(
    parseInt(arr[2]).toString(),
  );

  const timerFormatted = new Date(1000 * currentTimerValue)
    .toISOString()
    .substring(11, 19);

  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(timerData.name);

  const handleEdit = () => {
    const convertedToSeconds =
      parseInt(editedHours) * 3600 +
      parseInt(editedMinutes) * 60 +
      parseInt(editedSeconds);

    const newTimerData = {
      id: timerData.id,
      name: editedName,
      duration: convertedToSeconds,
      state: timerState,
    };
    editTimer(TimerCollectionId, newTimerData);
    setModalVisible(false);
    setDefaultTimerValue(newTimerData.duration);
    setCurrentTimerValue(newTimerData.duration);
  };

  useEffect(() => {
    if (currentTimerValue <= 0) {
      Alert.alert(`${timerData.name} finished!`);
      timerData.state = "stopped";
      setCurrentTimerValue(defaultTimerValue);
      setTimerState("stopped");
    } else {
      if (timerData.state == "running") {
        const id = setInterval(() => {
          setCurrentTimerValue(currentTimerValue - 1);
        }, 1000);

        return () => {
          clearInterval(id);
        };
      }
    }
  }, [currentTimerValue, timerState]);

  const handleStartPressed = () => {
    if (
      timerData.state == "running" &&
      currentTimerValue != defaultTimerValue
    ) {
      timerData.state = "paused";
      setTimerState("paused");
    } else {
      timerData.state = "running";
      setTimerState("running");
    }
  };

  const handleStopPressed = () => {
    timerData.state = "stopped";
    setTimerState("stopped");
    setCurrentTimerValue(defaultTimerValue);
  };

  const stopButton = () => {
    if (timerData.state == "running" || timerData.state == "paused") {
      return (
        <TouchableOpacity onPress={handleStopPressed}>
          <View style={[styles.standardButton, styles.stopButton]}>
            <Text style={styles.standardTimerText}>Stop</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (timerData.state == "stopped") {
      return <View></View>;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.avoidingView}
    >
      <View style={[styles.collectionContainer, styles.center]}>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <LinearGradient
            colors={["#140B35", "#3f0072"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.screenBackground}
          >
            <View style={[styles.modalView, styles.center, styles.primary]}>
              <View style={styles.removeButtonBox}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.center}>
                <Text style={styles.titleText}>Name:</Text>
                <TextInput
                  style={[styles.titleText, styles.timerText]}
                  placeholder="Name"
                  value={editedName}
                  onChangeText={setEditedName}
                />
              </View>
              <Text style={styles.titleText}>Duration: </Text>
              <View style={[styles.inline]}>
                <Text style={styles.timerDurationText}>Hr: </Text>
                <TextInput
                  style={styles.timerDurationInputText}
                  placeholder="Hr"
                  value={editedHours}
                  onChangeText={setEditedHours}
                  keyboardType="numeric"
                />
                <Text style={styles.timerDurationText}>Min: </Text>

                <TextInput
                  style={styles.timerDurationInputText}
                  placeholder="Min"
                  value={editedMinutes}
                  onChangeText={setEditedMinutes}
                  keyboardType="numeric"
                />
                <Text style={styles.timerDurationText}>Sec: </Text>

                <TextInput
                  style={styles.timerDurationInputText}
                  placeholder="Sec"
                  value={editedSeconds}
                  onChangeText={setEditedSeconds}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity onPress={handleEdit}>
                <View style={styles.standardButton}>
                  <Text style={styles.standardTimerText}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>

        <View style={styles.removeButtonBox}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeTimer(TimerCollectionId, timerData.id)}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.collectionNameBox, styles.center]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.titleText, styles.timerText, styles.center]}>
            {timerData.name}: {timerFormatted}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <View style={styles.horzContainer}>
            {stopButton()}
            <TouchableOpacity onPress={handleStartPressed}>
              <View style={[styles.standardButton]}>
                <Text style={styles.standardTimerText}>
                  {timerData.state == "running" ? "Pause" : "Start"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}
