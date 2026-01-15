import { Dimensions, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get("window");

export default function TelaInicial() {

  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      {/* FOTO DE PERFIL */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../../components/images/logoTeste.png')
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Tela inicial empresa</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do restaurante"
        placeholderTextColor="#999"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFEE93",
    justifyContent: "flex-start",
    paddingTop: 80,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    height: 65,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
});
