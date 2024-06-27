import { View, Text, Dimensions } from "react-native";

export default function TabTwoScreen() {
  const { width, height } = Dimensions.get("screen");
  return (
    <View style={{ backgroundColor: "#02003d", width: width, height: height }}>
      <Text style={{ color: "red" }}>Red</Text>
    </View>
  );
}
