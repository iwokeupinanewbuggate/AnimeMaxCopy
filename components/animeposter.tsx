import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
interface Anime {
  id: string;
  attributes: {
    titles: {
      en?: string;
      en_jp?: string;
    };
    posterImage: {
      small: string;
    };
  };
}
export const AnimePoster = ({
  title,
  poster,
  id,
  info,
}: {
  title: string;
  poster: string;
  id: string;
  info: Anime;
}) => {
  return (
    <View style={styles.card}>
      <Link href={`info/${id}`}>
        <Image style={styles.Naruto} source={{ uri: poster }} />
      </Link>
      <Text style={styles.textColor}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    width: 124,
    height: 225,
  },
  textColor: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  Naruto: {
    borderRadius: 10,
    width: 124,
    height: 185,
  },
});
