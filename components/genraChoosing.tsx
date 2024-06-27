import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export const ChooseGenre = ({
  genre,
  style,
}: {
  genre: string;
  style?: object;
}) => {
  const [buttonColor, setButtonColor] = useState("#4d4d4d");

  const changeColor = () => {
    setButtonColor(buttonColor === "#4d4d4d" ? "#E45959" : "#4d4d4d");
  };

  return (
    <Pressable
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      onPress={changeColor}
    >
      <Text style={styles.buttonText}>{genre}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4d4d4d",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
