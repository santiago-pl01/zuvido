import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const buttons = [
    {
      id: 'client',
      title: 'Sou Cliente/Usuário',
      subtitle: 'Quero ouvir cardápios acessíveis',
      icon: 'person' as const,
      route: '/clientes' as const,
      IconComponent: Ionicons,
    },
    {
      id: 'restaurant',
      title: 'Sou Restaurante/Administrador',
      subtitle: 'Quero cadastrar e gerenciar meu cardápio',
      icon: 'restaurant' as const,
      route: '/(admin)' as const,
      IconComponent: Ionicons,
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Menu Acessível',
          headerStyle: { backgroundColor: '#FFEE93' },
          headerTintColor: '#1A1A1A',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      {/* Logo */}
      <Image
        source={require("../screens/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>
        Como você deseja usar{"\n"}o Menu Acessível?
      </Text>

      {/* Botões */}
      <View style={styles.buttonsArea}>
        {buttons.map(button => (
          <Pressable
            key={button.id}
            style={[
              styles.button,
              hoveredButton === button.id && styles.buttonHovered
            ]}
            onPress={() => router.push(button.route as any)}
            onHoverIn={() => setHoveredButton(button.id)}
            onHoverOut={() => setHoveredButton(null)}
          >
            <View style={[
              styles.iconBox,
              hoveredButton === button.id && styles.iconBoxHovered
            ]}>
              <button.IconComponent
                name={button.icon}
                size={36}
                color={hoveredButton === button.id ? "#FFEE93" : "#000"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={[
                styles.buttonTitle,
                hoveredButton === button.id && styles.textHovered
              ]}>{button.title}</Text>
              <Text style={[
                styles.buttonSubtitle,
                hoveredButton === button.id && styles.textHovered
              ]}>{button.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFEE93", // amarelo suave
  },
  logo: {
    width: 200,
    height: 120,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 30,
    color: "#1A1A1A",
  },
  buttonsArea: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#1A1A1A",
    padding: 18,
    marginBottom: 18,
    backgroundColor: "transparent",
  },
  buttonHovered: {
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
  textHovered: {
    color: "#FFEE93",
  },
});