import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function InicioScreen() {
  const router = useRouter();
  const [isClienteHovered, setIsClienteHovered] = useState(false);
  const [isRestauranteHovered, setIsRestauranteHovered] = useState(false);

const onClientePress = () => {
    router.push("/cliente");
  };

  const onRestaurantePress = () => {
    router.push("/restaurante");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.safe.backgroundColor}
      />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={styles.title}>
          Como você deseja usar{"\n"}o Menu Acessível?
        </Text>

        {/* Botões */}
        <View style={styles.buttonsArea}>
          <Pressable
            style={[
              styles.bigButton,
              isClienteHovered && styles.bigButtonHovered
            ]}
            onPress={onClientePress}
            onHoverIn={() => setIsClienteHovered(true)}
            onHoverOut={() => setIsClienteHovered(false)}
          >
            <View style={[
              styles.iconBox,
              isClienteHovered && styles.iconBoxHovered
            ]}>
              <Ionicons 
                name="ear-outline" 
                size={36} 
                color={isClienteHovered ? "#FFEE93" : "#000"} />
            </View>
            <View style={styles.textBox}>
              <Text style={[
                styles.buttonTitle,
                isClienteHovered && { color: "#FFEE93" }
              ]}>Sou Cliente/Usuário</Text>
              <Text style={[
                styles.buttonSubtitle,
                isClienteHovered && { color: "#FFEE93" }
              ]}>
                Quero ouvir cardápios acessíveis
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.bigButton,
              isRestauranteHovered && styles.bigButtonHovered
            ]}
            onPress={onRestaurantePress}
            onHoverIn={() => setIsRestauranteHovered(true)}
            onHoverOut={() => setIsRestauranteHovered(false)}
          >
            <View style={[
              styles.iconBox,
              isRestauranteHovered && styles.iconBoxHovered
            ]}>
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={36}
                color={isRestauranteHovered ? "#FFEE93" : "#000"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={[
                styles.buttonTitle,
                isRestauranteHovered && { color: "#FFEE93" }
              ]}>
                Sou Restaurante/Administrador
              </Text>
              <Text style={[
                styles.buttonSubtitle,
                isRestauranteHovered && { color: "#FFEE93" }
              ]}>
                Quero cadastrar e gerenciar meu cardápio
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFEE93", // amarelo suave
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: Platform.OS === "android" ? 30 : 10,
    marginBottom: 10,
  },
  logoImage: {
    width: 200,
    height: 120,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 34,
    marginTop: 12,
    color: "#1A1A1A",
  },
  buttonsArea: {
    marginTop: 30,
    width: "100%",
  },
  bigButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#1A1A1A",
    padding: 18,
    marginBottom: 18,
    backgroundColor: "transparent",
  },
  bigButtonHovered: {
    backgroundColor: "#1A1A1A",
    transform: [{ scale: 1.02 }],
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconBoxHovered: {
    backgroundColor: "#1A1A1A",
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D0D0D",
  },
  buttonSubtitle: {
    fontSize: 13,
    marginTop: 6,
    color: "#222",
  },
});
