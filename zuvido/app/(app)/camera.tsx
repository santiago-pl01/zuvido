import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";

export default function QrCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false); 
  const router = useRouter();

  // --- RESETAR O SCANNER ---
  // O useFocusEffect roda toda vez que o usuário ENTRA nesta tela (ou volta para ela).
  // Serve para "destravar" o leitor, permitindo ler um novo QR Code.
  useFocusEffect(
    useCallback(() => {
      setScanned(false);
    }, [])
  );

 
  if (!permission) return <View />;
  
  // Se o usuário negou a câmera, mostra um botão pedindo de novo
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.textPermissao}>Precisamos da câmera para ler o cardápio</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.botaoPermissao}>
          <Text style={styles.buttonText}>Permitir Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // leitura do QR Code
  function handleBarcodeScanned({ data }: { data: string }) {
    // Se já leu, não faz nada (evita abrir 50 telas iguais)
    if (scanned) return; 
    setScanned(true);

    console.log("Código lido:", data);

    /* 
       --- EXPLICAÇÃO DA MUDANÇA DE LÓGICA (MODO DEMONSTRAÇÃO) ---
       
       Antes da alteração: 
       O leitor verificava se o QR Code era um link (http://...) ou um link interno do app.
       Se fosse um site externo (ex: Instagram), ele abria o navegador.
       
       ATUALMENTE (MVP / TESTE):
       Para facilitar o teste com o usuário beta, removi a verificação de links.
       Agora, o app ignora O QUE está escrito no QR Code.
       Ele assume que QUALQUER QR Code lido é um "Cardápio Válido" e redireciona
       o usuário imediatamente para a tela de Menu por Gestos.
       
       Isso permite testar a acessibilidade usando qualquer QR Code que tivermos à mão
       (uma garrafa de água, um livro, etc), sem precisar gerar códigos específicos.
    */

    // Passamos o conteúdo lido (data) como "ID do restaurante" para a próxima tela,
    // caso a gente queira simular cardápios diferentes no futuro.
    router.push({
      pathname: "/menuGestos",
      params: { restauranteId: data } 
    });
  }

  // --- RENDERIZAÇÃO DA TELA ---
  return (
    <View style={styles.container}>
      {/* O componente da câmera ocupa a tela inteira (absoluteFillObject) */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }} // Configurado para ler apenas QR Codes
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      
      {/* Overlay: Texto de instrução sobreposto na parte inferior */}
      <View style={styles.bottomOverlay}>
          <Text style={styles.instructionText}>Aponte para o QR Code</Text>
      </View>
    </View>
  );
}

// --- ESTILOS VISUAIS ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'black' 
  },
  // Estilos da tela de permissão negada
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#FFEE93" // Amarelo do tema
  },
  textPermissao: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 20 
  },
  botaoPermissao: { 
    backgroundColor: '#1A1A1A', 
    padding: 15, 
    borderRadius: 10 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  
  // Estilo do texto flutuante na câmera (Overlay)
  bottomOverlay: { 
    position: 'absolute', 
    bottom: 50, 
    left: 0, 
    right: 0, 
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro transparente para facilitar leitura
    borderRadius: 20,
    marginHorizontal: 20
  },
  instructionText: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center'
  },
});