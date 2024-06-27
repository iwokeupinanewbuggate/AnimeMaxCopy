import { Text, View } from "react-native";

export const AnimeGenre = ({ genre }: { genre: string }) => {
  return (
    <View>
      <Text style={{ color: "white", fontWeight: "bold" }}> {genre} |</Text>
    </View>
  );
};
