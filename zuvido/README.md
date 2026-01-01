# 🧩 Descrição das Pastas

| Pasta | Função | Exemplo |
|--------|--------|----------|
| **api/** | Comunicação com o backend (HTTP, Firebase, etc.) | `menuApi.ts` faz fetch dos pratos |
| **models/** | Define os tipos e modelos de dados | `interface Dish { id; name; price; }` |
| **services/** | Lógica de negócio (ex: filtrar pratos, calcular total) | `menuService.ts` |
| **navigation/** | Gerencia as rotas e tipos de navegação | `NavigationTypes.ts`, `AppNavigator.tsx` |
| **screens/** | Telas principais do app | `HomeScreen.tsx`, `MenuScreen.tsx` |
| **components/** | Componentes reutilizáveis | `Button.tsx`, `DishCard.tsx` |
| **hooks/** | Hooks personalizados | `useMenu()`, `useSpeech()` |
| **context/** | Estados globais (tema, acessibilidade, usuário) | `AccessibilityContext.tsx` |
| **utils/** | Funções auxiliares gerais | `formatPrice()`, `validateInput()` |

---

## 🧠 Arquitetura Utilizada

View (Screen)<br>
   ↓ usa<br>
ViewModel (Hook ou Context)<br>
   ↓ chama<br>
Service (lógica de negócio)<br>
   ↓ consulta<br>
API / Model (dados)<br>

# 🧩 Arquitetura MVVM

O **MVVM (Model–View–ViewModel)** é um padrão de arquitetura de software que separa a lógica de negócios da lógica de apresentação, tornando o código mais organizado, reutilizável e fácil de manter.

---

## ⚙️ Estrutura do MVVM

| **Camada** | **O que ela faz** | **O que não deve fazer** |
|-------------|-------------------|----------------------------|
| **Model** | Contém **dados** e **regras de negócio** (ex: salvar no banco, validar usuário, acessar API, etc). | Não deve saber nada sobre **interface** (botões, telas, etc). |
| **View** | Mostra **dados** e **recebe ações do usuário** (ex: cliques, campos, telas). | Não deve conter **lógica de negócio** — apenas **exibição**. |
| **ViewModel** | Faz a **ponte entre a View e o Model**. Contém a **lógica de apresentação**, ou seja, **como os dados devem ser mostrados ou atualizados na tela**. | Não deve conter **regras de negócio complexas** nem **rotas diretas**. |

---

## 🔄 Fluxo de Comunicação

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
