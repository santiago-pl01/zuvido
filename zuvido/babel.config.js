module.exports = function(api) {
  /* 
     --- O QUE É O BABEL? ---
     O Babel é um "transpilador". Pense nele como um tradutor simultâneo.
     Nós escrevemos código moderno (JavaScript ES6+, TypeScript, JSX), mas
     os celulares (Android/iOS) nem sempre entendem essas novidades nativamente.
     O Babel pega nosso código "chique" e traduz para um Javascript padrão
     que qualquer celular consegue ler e executar.
  */

  // Esta linha diz ao Babel: "Não traduza tudo do zero toda vez.
  // Se o arquivo não mudou, use a tradução que já está na memória (cache)."
  // Isso faz o app iniciar muito mais rápido no desenvolvimento.
  api.cache(true);

  return {
    // 'presets' são pacotes de configurações padrão.
    // O 'babel-preset-expo' já traz todas as traduções básicas que um app Expo precisa.
    presets: ['babel-preset-expo'],

    /* 
       --- A PARTE CRÍTICA (O SALVADOR DO PROJETO) ---
       
       Aqui em 'plugins' nós adicionamos superpoderes ao tradutor.
       
       Por que o app crashava sem a linha abaixo?
       R: A biblioteca de gestos (Gesture Handler) e a de animações (Reanimated)
       precisam rodar código na "UI Thread" (a via expressa do processador do celular)
       para que o arrastar de dedo seja liso e instantâneo (60 quadros por segundo).
       
       O Javascript normal roda na "JS Thread" (a via lenta).
       
       O plugin 'react-native-reanimated/plugin' altera o código durante a compilação
       para permitir que o Javascript "pule o muro" e converse direto com a UI Thread.
       
       SEM ESSE PLUGIN: O app tenta fazer o gesto, não consegue achar o caminho
       para a UI Thread, entra em pânico e fecha sozinho (Crash).
    */
    plugins: [
      'react-native-reanimated/plugin', 
    ],
  };
};