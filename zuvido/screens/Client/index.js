// src/screens/ClienteScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from "react-native";

export default function ClienteScreen({ navigation }) {
  const onQRCodePress = () => {
    console.log("Botão QR Code pressionado");
    // aqui depois colocaremos a tela de leitura de QR
  };

  const onLeituraPress = () => {
    console.log("Botão Exemplo de Leitura pressionado");
    // aqui colocaremos a função de leitura em voz (TTS)
  };

  const onConfigPress = () => {
    console.log("Botão Configurações pressionado");
    // aqui colocaremos a tela de configurações
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.safe.backgroundColor} />
      <View style={styles.container}>
        {/* Logo do menu */}
        <Image
          source={require("../assets/logo.png")} // substitua pelo seu logo
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={styles.title}>Menu Acessível</Text>

        {/* Botões */}
        <View style={styles.buttonsArea}>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={onQRCodePress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bigButton}
            onPress={onLeituraPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Exemplo de Leitura</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bigButton}
            onPress={onConfigPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFEE93", // mesmo fundo da primeira tela
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: Platform.OS === "android" ? 30 : 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 20,
    color: "#1A1A1A",
  },
  buttonsArea: {
    marginTop: 10,
    width: "100%",
  },
  bigButton: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
});
