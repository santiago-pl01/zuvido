import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// essas aqui são as bibliotecas de gestos (arrastar, tocar)
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// essas aqui são as bibliotecas de acessibilidade (Fala e Vibração)
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

// --- DADOS DO CARDÁPIO ---
// Aqui é só um exemplo de dados que do nosso futuro firebase
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
  
  // --- ESTADOS DO APP ---
  // Controlam onde estamos na lista (índice da categoria e do item)
  const [catIndex, setCatIndex] = useState(0); 
  const [itemIndex, setItemIndex] = useState(0); 
  const [carrinho, setCarrinho] = useState<any[]>([]);
  
  // isso aqui é para saber se é a primeira vez que a tela abre (para controlar a fala inicial)
  const isFirstRender = useRef(true);

  // --- 1. O QUE ACONTECE AO ABRIR A TELA ---
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const iniciarNarracao = async () => {
      // a ia vai parar qualquer fala que esteja acontecendo
      await Speech.stop();
      
      // Fala as instruções de uso
      Speech.speak(
        "Menu por gestos. Deslize para os lados para mudar categoria. Cima e baixo muda o item. Dois toques adiciona ao carrinho.",
        { language: 'pt-BR' }
      );

      // tempo da instrução acabar, para falar qual é o primeiro item
      timer = setTimeout(() => {
        falarItem(0, 0);
      }, 12500);
    };

    iniciarNarracao();

    // FUNÇÃO DE LIMPEZA:
    // para quando o usario sair da tela (antes, quando saia e voltava para tela de ler o qr code, o leitor não funcionava) (volta pra câmera ou fecha o app).
    // e tambem a ia vai parar de falar se o usuario sair da tela (antes, a fala continuava mesmo saindo da tela)
    return () => {
      clearTimeout(timer);
      Speech.stop();
    };
  }, []);

  // --- 2. O QUE ACONTECE QUANDO MUDAMOS DE ITEM ---
  useEffect(() => {
    // Se for a primeira vez, não faz nada (pois o código de cima já cuida disso)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Se não for a primeira vez, lê o novo item selecionado
    falarItem(catIndex, itemIndex);
  }, [catIndex, itemIndex]);

  // --- LÓGICA INTELIGENTE DE FALA ---
  const falarItem = async (cIndex: number, iIndex: number) => {
    const item = CARDAPIO[cIndex].itens[iIndex];
    const cat = CARDAPIO[cIndex].categoria;
    
    // TRUQUE DE CONTEXTO:
    // Se a categoria for bebida, falamos "Tamanho". Se for comida, "Ingredientes".
    const rotulo = cat === 'Bebidas' ? 'Tamanho' : 'Ingredientes';
    
    // Vibra o celular para dar feedback tátil
    Haptics.selectionAsync();
    
    await Speech.stop();
    
    // Monta a frase completa e manda a IA falar
    const texto = `${cat}. ${item.nome}. ${item.desc} ${rotulo}: ${item.detalhes}. Preço: ${item.preco} reais.`;
    Speech.speak(texto, { language: 'pt-BR' });
  };

  // --- FUNÇÕES DE NAVEGAÇÃO ---
  
  // Muda a categoria (Lanches -> Bebidas)
  function mudarCategoria(direcao: number) {
    let novoIndex = catIndex + direcao;
    // Verifica se não estamos tentando ir antes do primeiro ou depois do último
    if (novoIndex >= 0 && novoIndex < CARDAPIO.length) {
      setCatIndex(novoIndex);
      setItemIndex(0); // Reseta para o primeiro item da nova categoria
    } else {
      // Se tentar passar do limite, vibra diferente (aviso de erro)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  // Muda o item dentro da categoria (X-Salada -> X-Bacon)
  function mudarItem(direcao: number) {
    let novoIndex = itemIndex + direcao;
    const maxItens = CARDAPIO[catIndex].itens.length;
    
    if (novoIndex >= 0 && novoIndex < maxItens) {
      setItemIndex(novoIndex);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  // Adiciona ao carrinho de compras
  function adicionarAoCarrinho() {
    const item = CARDAPIO[catIndex].itens[itemIndex];
    setCarrinho([...carrinho, item]);
    
    // Vibração de sucesso
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Speech.stop();
    Speech.speak(`${item.nome} adicionado ao carrinho.`, { language: 'pt-BR' });
  }

  // --- CONFIGURAÇÃO DOS GESTOS (SWIPE / TAP) ---
  
  // Gesto de Arrastar (Pan)
  const panGesture = Gesture.Pan()
    .runOnJS(true) // IMPORTANTE: Roda no Javascript para evitar travar o app (crash)
    .onEnd((e) => {
      // Lógica matemática para saber se arrastou mais na horizontal ou vertical
      if (Math.abs(e.translationX) > Math.abs(e.translationY)) {
        // Horizontal: Muda Categoria
        if (e.translationX > 50) mudarCategoria(-1); // Direita -> Volta
        else if (e.translationX < -50) mudarCategoria(1); // Esquerda -> Avança
      } else {
        // Vertical: Muda Item
        if (e.translationY > 50) mudarItem(-1); // Baixo -> Anterior
        else if (e.translationY < -50) mudarItem(1); // Cima -> Próximo
      }
    });

  // Gesto de Duplo Toque (Double Tap)
  const doubleTapGesture = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2) // Precisa bater 2 vezes
    .onEnd(() => {
      adicionarAoCarrinho();
  });

  // Combina os gestos para funcionarem juntos na mesma tela
  const gestures = Gesture.Race(doubleTapGesture, panGesture);

  // Variáveis auxiliares para exibir na tela
  const itemAtual = CARDAPIO[catIndex].itens[itemIndex];
  const categoriaAtual = CARDAPIO[catIndex].categoria;
  const rotuloVisual = categoriaAtual === 'Bebidas' ? 'Tamanho:' : 'Ingredientes:';

  // --- PARTE VISUAL (O QUE APARECE NA TELA) ---
  return (
      <GestureDetector gesture={gestures}>
        <View style={styles.container}>
          
          {/* Cabeçalho Amarelo */}
          <View style={styles.header}>
             <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={50} color="#1A1A1A" />
             </TouchableOpacity>
             <Text style={styles.categoriaTitle}>{categoriaAtual.toUpperCase()}</Text>
          </View>

          {/* Cartão Central com as infos do produto */}
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
          </View>

          {/* Rodapé / Botão do Carrinho */}
          <TouchableOpacity 
             style={styles.footer} 
             onPress={() => Speech.speak(`Total ${carrinho.length} itens no carrinho.`, {language:'pt-BR'})}
          >
             <Text style={styles.carrinhoText}>CARRINHO ({carrinho.length})</Text>
          </TouchableOpacity>

        </View>
      </GestureDetector>
  );
}

// --- ESTILOS VISUAIS (ALTO CONTRASTE) ---
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
  carrinhoText: { fontSize: 24, fontWeight: '900', color: '#1A1A1A' }
});