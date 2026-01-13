/**  Este codigo cria botões interativos com ícones e textos, ou seja, para declarar um botão usando esse codigo
 *  basta, na pagina onde vc deseja usar o botão, importar o componente AuthButton e passar as props necessárias
 * como id, title, subtitle, icon, hovered, onPress, onHoverIn e onHoverOut.
 * 
 */


import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// define o valor da props que o componente Button vai receber
type Props = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  hovered: boolean;
  onPress: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
};

// função que cria o componete Button
export function Button({
  title,
  subtitle,
  icon,
  hovered,
  onPress,
  onHoverIn,
  onHoverOut,
}: Props) {
  return (
    <Pressable
      style={[styles.button, hovered && styles.buttonHovered]}
      onPress={onPress}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
    >
      <View style={[styles.iconBox, hovered && styles.iconBoxHovered]}>
        <Ionicons
          name={icon}
          size={36}
          color={hovered ? "#FFEE93" : "#000"}
        />
      </View>

      <View style={styles.textBox}>
        <Text style={[styles.buttonTitle, hovered && styles.textHovered]}>
          {title}
        </Text>
        <Text style={[styles.buttonSubtitle, hovered && styles.textHovered]}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}



const styles = StyleSheet.create({
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
