import { AnimeGenre } from "@/components/animeCategory";
import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface AnimeAttributes {
  startDate: string;
  posterImage: {
    small: string;
  };
  titles: {
    en: string;
  };
  averageRating: string;
  description: string;
}

interface AnimeData {
  attributes: AnimeAttributes;
}

interface GenreAttributes {
  name: string;
}

interface GenreData {
  attributes: GenreAttributes;
}

export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<AnimeData | null>(null);
  const [animeGenre, setAnimeGenre] = useState<GenreData[]>([]);
  useEffect(() => {
    const get = async () => {
      try {
        const res = await axios.get(`https://kitsu.io/api/edge/anime/${id}`);
        const GenreRes = await axios.get(
          `https://kitsu.io/api/edge/anime/${id}/genres`
        );
        setAnimeGenre(GenreRes.data.data);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    get();
  }, []);

  const releasedDate = data?.attributes.startDate.substring(0, 4);
  return (
    <ScrollView style={{ backgroundColor: "#02003d" }}>
      <View style={styles.container}>
        <Link href={"/"}>
          <Icon name="arrow-right" size={24} color="#fff" />
        </Link>
        <View style={styles.innerConainter}>
          <Image
            source={{ uri: data?.attributes.posterImage.small }}
            style={styles.posterStyle}
          />

          <Text style={styles.textColor}>{data?.attributes.titles.en}</Text>
          <Text style={styles.textColor}>
            {releasedDate} |
            {animeGenre.map((genre, key) => (
              <AnimeGenre genre={genre.attributes.name} key={key} />
            ))}
            <Text style={styles.textColor}>
              {data?.attributes.averageRating}
            </Text>
          </Text>

          <Text style={styles.descriptionContainer}>
            {data?.attributes.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#02003d",
    color: "white",
    padding: 10,
    position: "relative",
  },
  descriptionContainer: {
    color: "white",
  },
  textColor: {
    color: "white",
    fontWeight: "bold",
  },
  innerConainter: {
    width: 300,
  },
  posterStyle: {
    width: 300,
    height: 400,
    borderRadius: 20,
  },
});
