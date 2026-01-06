//importação das bibliotecas necessárias
import { Dimensions } from "react-native";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Stack, useRouter } from "expo-router";

const { width } = Dimensions.get("window");

//função que inicializa o projeto
export default function MenuAcessivel() {

  //espaço para funções, apenas chamalas e NUNCA CRIAER FUNÇÕES AQUI
  const router = useRouter();

  return (

    <View style={styles.container}>

      {/* Logo */}
      <Image
        source={require("../components/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* botão para ler qrcod */}
      <TouchableOpacity style={styles.botaoGrande} onPress={() => router.push("../camera")}>
        <Text>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/loginEmpresa")}>
        <Text>sou empresa</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFEE93", // amarelo suave
    justifyContent: "flex-start",
    paddingTop: 80, // quanto maior, mais para baixo; menor, mais para cima
  },


  logo: {
    width: 200,
    height: 120,
    marginTop: 40,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  botaoGrande: {
    width: width * 0.75,
    height: width * 0.75,
    backgroundColor: "#4F46E5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },


});
