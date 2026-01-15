//importação das bibliotecas necessárias

import { View, Text, TextInput, StyleSheet, Image , TouchableOpacity} from "react-native";

import { Stack, useRouter } from "expo-router";

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

      {/* Título */}
      <Text style={styles.title}>Menu Acessível</Text>

      {/* Campos de entrada de dados */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      

      
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text>voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("../empresa/tela_inicial")}>
        <Text>teste</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffffff", //branco
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

  input: {
    width: "100%",
    height: 65,                 // mais alto
    borderWidth: 3,             // borda grossa
    borderColor: "#000",        // preto (alto contraste)
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 24,               // texto grande
    fontWeight: "600",
    color: "#000000",           // texto preto
  },

});
