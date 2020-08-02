import React, { useEffect, useState } from "react";
import api from "./services/api";
import { Card } from "./components";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await api.get("repositories");

    if (result.status) {
      setList(result.data);
    }
  }

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`);

    const newList = list.map((item) => {
      if (item.id !== id) {
        return item;
      }
      item.likes += 1;

      return item;
    });

    setList(newList);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              id={item.id}
              title={item.title}
              likes={item.likes}
              techs={item.techs}
              addLike={() => handleLikeRepository(item.id)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "white",
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
