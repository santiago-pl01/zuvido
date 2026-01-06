import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { useRouter } from "expo-router";

//para ler QR Code por meio de 'links', como por exemplo um link de site ou um link interno
import * as Linking from "expo-linking";


export default function QrCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permissão para usar a câmera é necessária</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.buttonText}>Permitir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*
   * Função chamada quando um QR Code é detectado
     data → conteúdo do QR Code */

  function handleBarcodeScanned({ data }: { data: string }) {
    /**Marca que o QR já foi lido */
    setScanned(true);

    
  // 👉 Caso seja um link da web
  if (data.startsWith("http://") || data.startsWith("https://")) {
    Linking.openURL(data);
    return;
  }

  // 👉 Caso seja uma rota interna do app

  /**if (data.startsWith("app://")) {
    const rota = data.replace("app://", "/");
    router.push(rota);
    return;
  } */
  
  // 👉 Caso seja uma rota simples (ex: perfil/123)
  //router.push(`/${data}`);


    // exemplo: voltar para a tela anterior
    router.back();
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {scanned && (
        <TouchableOpacity
          style={styles.scanAgain}
          onPress={() => setScanned(false)}
        >
          <Text style={{ color: "#fff" }}>Escanear novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  buttonText: {
    marginTop: 15,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },

  scanAgain: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
});
