import { TimerCollection } from "./Types";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { styles } from "./Shared";
import { useTimerContext } from "./timerContext";
import { LinearGradient } from "expo-linear-gradient";

interface TimerSetItemViewProps {
  timerCollectionData: TimerCollection;
  onView: (id: string) => void;
  //onEdit: (id: string) => void,
}
export function TimerCollectionItemView({
  timerCollectionData,
  onView,
}: TimerSetItemViewProps) {
  const { removeTimerCollection, editTimerCollectionName } = useTimerContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const handleEdit = () => {
    editTimerCollectionName(
      timerCollectionData.collectionId,
      editedCollectionName,
    );
    setModalVisible(false);
  };

  return (
    <View style={[styles.collectionContainer, styles.center]}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <LinearGradient
          colors={["#140B35", "#3f0072"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.screenBackground}
        >
          <View style={[styles.center]}>
            <View style={[styles.modalView, styles.center, styles.primary]}>
              <View style={styles.removeButtonBox}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.titleText, styles.center, styles.textInputBox]}
                placeholder={timerCollectionData.collectionName}
                value={editedCollectionName}
                onChangeText={setEditedCollectionName}
                autoFocus={true}
                selectTextOnFocus={true}
              />
              <TouchableOpacity onPress={handleEdit}>
                <View style={styles.standardButton}>
                  <Text style={styles.standardTimerText}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Modal>

      <View style={styles.removeButtonBox}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() =>
            removeTimerCollection(timerCollectionData.collectionId)
          }
        >
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.collectionNameBox, styles.center]}
        onPress={() => onView(timerCollectionData.collectionId)}
      >
        <Text style={[styles.titleText, styles.timerText]}>
          {timerCollectionData.collectionName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={[styles.standardButton]}>
          <Text style={styles.standardTimerText}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
