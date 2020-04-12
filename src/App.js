import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Header from "./Components/Header";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    GetRepository();
  }, []);

  async function GetRepository() {
    try {
      // Pega Lista de tecnologias
      const res = await api.get(`/repositories`);
      // Verifica requisição
      if (res.status === 200) {
        // Atribuir a lista
        setRepositories(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleLikeRepository(id) {
    try {
      // Requisição de curtir repositório
      const res = await api.post(`/repositories/${id}/like`);
      // Verifica requisição
      if (res.status === 200) {
        // Atribuir o curtir a lista
        setRepositories(repositories.map(repo => {
          if (repo.id === id) {
            repo.likes += 1;
          }
          // Retornar valores atualizados
          return repo;
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Header title="GoStack Repo" />
        <FlatList
          style={styles.container}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item: r}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{r.title}</Text>

                <View style={styles.techsContainer}>
                  {r.techs.length > 0 ? (
                      r.techs.map(item => (
                        <Text key={item} style={styles.tech}>{item}</Text>
                      ))
                  ) : null}
                </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${r.id}`}
                >
                  {r.likes > 1 ? r.likes + ' curtidas' : r.likes + ' curtida'}
                  </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(r.id)}
                testID={`like-button-${r.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
