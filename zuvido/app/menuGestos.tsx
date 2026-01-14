import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Adicionamos Directions para garantir tipagem se necessário, mas o principal é o Gesture
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

// DADOS MOCKADOS
const CARDAPIO = [
  {
    categoria: 'Lanches',
    itens: [
      { 
        id: 1, 
        nome: 'X-Salada', 
        preco: 20.00, 
        desc: 'O clássico refrescante.', 
        detalhes: 'Pão brioche, hambúrguer de 180g, queijo, alface e tomate.'
      },
      { 
        id: 2, 
        nome: 'X-Bacon', 
        preco: 25.00, 
        desc: 'Sabor defumado.', 
        detalhes: 'Pão australiano, hambúrguer, muito bacon e barbecue.'
      },
    ]
  },
  {
    categoria: 'Bebidas',
    itens: [
      { 
        id: 4, 
        nome: 'Coca-Cola', 
        preco: 6.00, 
        desc: 'Refrigerante.', 
        detalhes: 'Lata de 350ml.' 
      },
      { 
        id: 5, 
        nome: 'Suco de Laranja', 
        preco: 8.00, 
        desc: 'Natural.', 
        detalhes: 'Copo de 500ml.'
      },
    ]
  },
  {
    categoria: 'Sobremesas',
    itens: [
      { 
        id: 6, 
        nome: 'Pudim', 
        preco: 10.00, 
        desc: 'O queridinho.', 
        detalhes: 'Leite condensado com calda de caramelo.'
      }
    ]
  }
];

export default function MenuGestos() {
  const router = useRouter();
  
  // Estados
  const [catIndex, setCatIndex] = useState(0); 
  const [itemIndex, setItemIndex] = useState(0); 
  const [carrinho, setCarrinho] = useState<any[]>([]);
  
  const isFirstRender = useRef(true);

  // 1. INSTRUÇÕES (Atualizadas com a info de remover)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const iniciarNarracao = async () => {
      await Speech.stop();
      Speech.speak(
        "Menu por gestos. Deslize para esquerda ou direita para navegar entre as categorias. Dois toques adiciona o produto. Segure o dedo para remover do carrinho.",
        { language: 'pt-BR' }
      );

      timer = setTimeout(() => {
        falarItem(0, 0);
      }, 15000); // Tempo ajustado para a frase nova
    };

    iniciarNarracao();

    return () => {
      clearTimeout(timer);
      Speech.stop();
    };
  }, []);

  // 2. MONITORAR MUDANÇAS DE ITEM
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    falarItem(catIndex, itemIndex);
  }, [catIndex, itemIndex]);

  // --- LÓGICA DE FALA ---
  const falarItem = async (cIndex: number, iIndex: number) => {
    const item = CARDAPIO[cIndex].itens[iIndex];
    const cat = CARDAPIO[cIndex].categoria;
    const rotulo = cat === 'Bebidas' ? 'Tamanho' : 'Ingredientes';
    
    Haptics.selectionAsync();
    await Speech.stop();
    
    // Verifica quantos desse item já tem no carrinho para avisar o usuário
    const qtdNoCarrinho = carrinho.filter(i => i.id === item.id).length;
    const avisoCarrinho = qtdNoCarrinho > 0 ? `Você tem ${qtdNoCarrinho} no carrinho.` : "";

    const texto = `${cat}. ${item.nome}. ${item.desc} ${rotulo}: ${item.detalhes}. Preço: ${item.preco} reais. ${avisoCarrinho}`;
    
    Speech.speak(texto, { language: 'pt-BR' });
  };

  // --- FUNÇÕES DE NAVEGAÇÃO ---
  function mudarCategoria(direcao: number) {
    let novoIndex = catIndex + direcao;
    if (novoIndex >= 0 && novoIndex < CARDAPIO.length) {
      setCatIndex(novoIndex);
      setItemIndex(0);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  function mudarItem(direcao: number) {
    let novoIndex = itemIndex + direcao;
    const maxItens = CARDAPIO[catIndex].itens.length;
    if (novoIndex >= 0 && novoIndex < maxItens) {
      setItemIndex(novoIndex);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  // --- FUNÇÕES DO CARRINHO ---

  function adicionarAoCarrinho() {
    const item = CARDAPIO[catIndex].itens[itemIndex];
    setCarrinho(prev => [...prev, item]); // Adiciona na lista
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Speech.stop();
    Speech.speak(`${item.nome} adicionado.`, { language: 'pt-BR' });
  }

  // NOVA FUNÇÃO: Remover item
  function removerDoCarrinho() {
    const itemAtual = CARDAPIO[catIndex].itens[itemIndex];
    
    // Verifica se o item existe no carrinho
    const indexNoCarrinho = carrinho.findIndex(i => i.id === itemAtual.id);

    if (indexNoCarrinho !== -1) {
      // Se achou, cria uma cópia do carrinho e remove APENAS aquele item
      const novoCarrinho = [...carrinho];
      novoCarrinho.splice(indexNoCarrinho, 1);
      setCarrinho(novoCarrinho);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Speech.stop();
      Speech.speak(`${itemAtual.nome} removido.`, { language: 'pt-BR' });
    } else {
      // Se não tem esse item no carrinho
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Speech.stop();
      Speech.speak("Este item não está no seu carrinho.", { language: 'pt-BR' });
    }
  }

  // --- GESTOS ---
  
  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onEnd((e) => {
      if (Math.abs(e.translationX) > Math.abs(e.translationY)) {
        if (e.translationX > 50) mudarCategoria(-1);
        else if (e.translationX < -50) mudarCategoria(1);
      } else {
        if (e.translationY > 50) mudarItem(-1);
        else if (e.translationY < -50) mudarItem(1);
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onEnd(() => {
      adicionarAoCarrinho();
  });

  // NOVO GESTO: Segurar
  const longPressGesture = Gesture.LongPress()
    .runOnJS(true)
    .minDuration(800) // Tem que segurar por 800ms (quase 1 segundo)
    .onEnd((e, success) => {
      if (success) {
        removerDoCarrinho();
      }
    });

  // Combina os gestos (Race significa que quem acontecer primeiro ganha, mas o Simultaneous permite coexistência se configurado)
  // Neste caso, usamos Race entre Tap e LongPress, e Simultaneous com Pan às vezes. 
  // Mas para simplificar e evitar conflito, o Race funciona bem aqui.
  const gestures = Gesture.Race(doubleTapGesture, longPressGesture, panGesture);

  // --- RENDER ---
  const itemAtual = CARDAPIO[catIndex].itens[itemIndex];
  const categoriaAtual = CARDAPIO[catIndex].categoria;
  const rotuloVisual = categoriaAtual === 'Bebidas' ? 'Tamanho:' : 'Ingredientes:';

  return (
      <GestureDetector gesture={gestures}>
        <View style={styles.container}>
          
          <View style={styles.header}>
             <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={50} color="#1A1A1A" />
             </TouchableOpacity>
             <Text style={styles.categoriaTitle}>{categoriaAtual.toUpperCase()}</Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.imagePlaceholder}>
                <Ionicons name="fast-food" size={120} color="#1A1A1A" />
            </View>
            <Text style={styles.produtoNome}>{itemAtual.nome}</Text>
            <View style={styles.divider} />
            <Text style={styles.produtoIngredientes}>
               {rotuloVisual} {itemAtual.detalhes}
            </Text>
            <Text style={styles.produtoPreco}>R$ {itemAtual.preco.toFixed(2)}</Text>
            
            {/* Feedback Visual se o item está no carrinho */}
            {carrinho.some(i => i.id === itemAtual.id) && (
              <View style={styles.badgeCarrinho}>
                <Text style={styles.badgeText}>NO CARRINHO</Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
             style={styles.footer} 
             onPress={() => Speech.speak(`Total ${carrinho.length} itens. Valor total: ${carrinho.reduce((a,b) => a + b.preco, 0).toFixed(2)} reais.`, {language:'pt-BR'})}
          >
             <Text style={styles.carrinhoText}>CARRINHO ({carrinho.length})</Text>
          </TouchableOpacity>

        </View>
      </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', padding: 20, paddingTop: 50, justifyContent: 'space-between' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFEE93', borderRadius: 15, padding: 10 },
  categoriaTitle: { fontSize: 24, fontWeight: '900', color: '#1A1A1A', flex: 1, textAlign: 'center' },
  cardContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagePlaceholder: { width: 180, height: 180, backgroundColor: '#FFEE93', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 4, borderColor: '#FFF' },
  produtoNome: { fontSize: 32, fontWeight: 'bold', color: '#FFEE93', textAlign: 'center', marginBottom: 5 },
  produtoIngredientes: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', marginBottom: 15, fontStyle: 'italic', paddingHorizontal: 10 },
  produtoPreco: { fontSize: 40, fontWeight: 'bold', color: '#FFEE93' },
  divider: { width: 50, height: 4, backgroundColor: '#FFEE93', marginVertical: 10 },
  footer: { backgroundColor: '#FFEE93', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  carrinhoText: { fontSize: 24, fontWeight: '900', color: '#1A1A1A' },
  
  // Estilo novo para indicar visualmente que o item está no carrinho
  badgeCarrinho: {
    marginTop: 15,
    backgroundColor: '#4CAF50', // Verde
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold'
  }
});