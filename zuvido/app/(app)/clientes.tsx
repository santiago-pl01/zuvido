import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function MenuButton({ title, subtitle, icon, onPress, isHovered, onHover }: {
  title: string;
  subtitle: string;
  icon: "qrcode-scan" | "book-open-variant" | "cog";
  onPress: () => void;
  isHovered: boolean;
  onHover: (hover: boolean) => void;
}) {
  return (
    <Pressable
      style={[styles.button, isHovered && styles.buttonHovered]}
      onPress={onPress}
      onHoverIn={() => onHover(true)}
      onHoverOut={() => onHover(false)}
    >
      <View style={[styles.icon, isHovered && styles.iconHovered]}>
        <MaterialCommunityIcons
          name={icon}
          size={36}
          color={isHovered ? "#FFEE93" : "#000"}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isHovered && styles.textHovered]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, isHovered && styles.textHovered]}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

export default function ClienteScreen() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'qrcode',
      title: 'QR Code',
      subtitle: 'Escaneie o código do cardápio',
      icon: 'qrcode-scan' as const,
      route: '/qrcode',
    },
    {
      id: 'exemplo',
      title: 'Exemplo de Leitura',
      subtitle: 'Veja como funciona o cardápio',
      icon: 'book-open-variant' as const,
      route: '/exemplo',
    },
    {
      id: 'config',
      title: 'Configurações',
      subtitle: 'Ajuste suas preferências',
      icon: 'cog' as const,
      route: '/config'
    },
  ];

  return (
    <View style={styles.container}>


      <Image
        source={require("../../screens/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.header}>Menu Acessível</Text>

      <View style={styles.menu}>
        {menuItems.map(item => (
          <MenuButton
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={() => router.push(item.route as any)}
            isHovered={hoveredButton === item.id}
            onHover={(hover) => setHoveredButton(hover ? item.id : null)}
          />
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
    backgroundColor: "#FFEE93",
  },
  logo: {
    width: 200,
    height: 120,
    marginVertical: 8,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 12,
    color: "#1A1A1A",
  },
  menu: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#1A1A1A",
    padding: 18,
    marginBottom: 18,
  },
  buttonHovered: {
    backgroundColor: "#1A1A1A",
    transform: [{ scale: 1.02 }],
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconHovered: {
    backgroundColor: "#1A1A1A",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D0D0D",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 6,
    color: "#222",
  },
  textHovered: {
    color: "#FFEE93",
  },
});