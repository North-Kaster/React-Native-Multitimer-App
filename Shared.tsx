import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";

interface TitleTextProps {
  children?: string;
}

export function TitleText({ children }: TitleTextProps) {
  return <Text style={styles.titleText}>{children}</Text>;
}
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const timerContainerWidth = screenWidth - 20;
const innerWidth = screenWidth * 0.8;

const borderRadius = 15;

//---COLORS---

const red = "#d39aff";
const background = "#301a65";
const primary = "#321e73";
const darker = "#231750";

const accent = "#c03cff";
const text = "#ffffff";

export const styles = StyleSheet.create({
  timerDurationText: {
    color: text,
    fontSize: 20,
  },
  timerDurationInputText: {
    color: text,
    fontSize: 20,
    borderRadius: borderRadius,
    backgroundColor: darker,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 3,
    marginRight: 5,
    textAlign: "center",
  },

  textInputBox: {
    width: "95%",
    backgroundColor: darker,
  },

  primary: {
    backgroundColor: primary,
  },
  testing: {
    backgroundColor: "red",
  },
  screenBackground: {
    width: "100%",
    height: "100%",
  },
  titleText: {
    fontSize: 30,
    padding: 10,
    color: text,
  },
  timerText: {
    width: "95%",
    fontSize: 24,
    padding: 10,
    borderRadius: borderRadius,
    backgroundColor: darker,
    textAlign: "center",
  },
  subTitleText: {
    fontSize: 20,
  },
  safeArea: {
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  scrollContainer: {
    width: "100%",
  },
  horzContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  labelText: {
    fontSize: 18,
  },
  backgroundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  timerContainer: {
    height: 200,
    width: timerContainerWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background,
    borderRadius: borderRadius,
  },
  collectionContainer: {
    width: innerWidth,
    backgroundColor: primary,
    borderRadius: borderRadius,
    margin: 20,
  },

  collectionNameBox: {
    width: innerWidth,
    margin: 20,
  },

  collectionNameText: {
    color: text,
    fontSize: 50,
  },

  removeButtonText: {
    fontSize: 30,
  },

  removeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 100,
    backgroundColor: accent,
    fontWeight: "bold",
    width: 20,
    alignItems: "center",
  },

  removeButtonBox: {
    width: innerWidth,
    height: 15,
  },

  standardTimerText: {
    color: text,
    textAlign: "center",
  },

  standardButton: {
    width: 80,
    padding: 20,
    margin: 10,
    borderRadius: borderRadius,
    backgroundColor: accent,
  },

  whiteText: {
    color: "white",
    textAlign: "center",
  },

  saveChangesButton: {
    width: 120,
    padding: 20,
    margin: 10,
    borderRadius: borderRadius,
    backgroundColor: accent,
  },

  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  stopButton: {
    backgroundColor: red,
  },

  modalView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: screenHeight / 4,
    gap: 20,
    borderRadius: borderRadius,
    padding: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  inline: {
    flexDirection: "row",
    textAlign: "left",
    alignItems: "center",
  },
});
