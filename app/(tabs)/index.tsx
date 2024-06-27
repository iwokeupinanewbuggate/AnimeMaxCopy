import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { ChooseGenre } from "@/components/genraChoosing";
import { AnimePoster } from "@/components/animeposter";
import axios from "axios";
import { NativeSyntheticEvent } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
export default function HomeScreen() {
  const dummyData = [
    { genre: "Action" },
    { genre: "Adventure" },
    { genre: "Horror" },
    { genre: "Drama" },
    { genre: "Fantasy" },
    { genre: "Thriller" },
    { genre: "Romance" },
    { genre: "More" },
  ];
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
  const [data, setData] = useState<Anime[]>([]);
  const [secondData, setSecondData] = useState<Anime[]>([]);
  const [text, settext] = useState("");
  const [searchBar, setSearchbar] = useState(false);

  const handelText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    settext(e.nativeEvent.text);
  };
  useEffect(() => {
    const get = async () => {
      try {
        const res = await axios.get("https://kitsu.io/api/edge/trending/anime");
        const otherAnime = await axios.get("https://kitsu.io/api/edge/anime");
        setData(res.data.data);
        setSecondData(otherAnime.data.data);
        console.log(res, otherAnime);
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, []);
  const closeSearchBar = () => {
    setSearchbar(false);
  };
  const openSearchBar = () => {
    setSearchbar(true);
  };
  const filterBySearch = data.filter((anime) =>
    anime.attributes.titles.en
      ?.toLocaleLowerCase()
      .includes(text.toLocaleLowerCase())
  );
  const filterBySearchSecond = secondData.filter((anime) =>
    anime.attributes.titles.en
      ?.toLocaleLowerCase()
      .includes(text.toLocaleLowerCase())
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.textColor}>
            Choose genre
            {searchBar ? (
              <>
                <TextInput
                  style={styles.inputStyle}
                  onChange={handelText}
                  value={text}
                />{" "}
                <Icon
                  onPress={closeSearchBar}
                  name="search"
                  size={24}
                  color="#f7f7f7"
                />
              </>
            ) : (
              !searchBar && (
                <Icon
                  onPress={openSearchBar}
                  name="search"
                  size={24}
                  color="#f7f7f7"
                />
              )
            )}
          </Text>
          <View style={styles.genreContainer}>
            {dummyData.map((info, key) => (
              <ChooseGenre key={key} genre={info.genre} />
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.textColor}>Popular</Text>
          <ScrollView horizontal>
            {filterBySearch.map((info, key) => {
              return (
                <AnimePoster
                  key={key}
                  title={
                    info.attributes.titles.en ||
                    info.attributes.titles.en_jp ||
                    "No Title"
                  }
                  poster={info.attributes.posterImage.small}
                  id={info.id}
                  info={info}
                />
              );
            })}
          </ScrollView>
          <Text style={styles.textColor}>Older animes</Text>
          <ScrollView horizontal>
            {filterBySearchSecond.map((info, key) => {
              return (
                <AnimePoster
                  key={key}
                  title={
                    info.attributes.titles.en ||
                    info.attributes.titles.en_jp ||
                    "No Title"
                  }
                  poster={info.attributes.posterImage.small}
                  id={info.id}
                  info={info}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: "white",
    fontSize: 20,
  },
  container: {
    flexDirection: "column",
    backgroundColor: "#02003d",
    padding: 50,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  posterContainer: {
    flexDirection: "row",
    gap: 10,
    display: "flex",
    overflow: "scroll",
  },
  inputStyle: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 20,
    color: "white",
    width: 130,
    padding: 3,
  },
});
