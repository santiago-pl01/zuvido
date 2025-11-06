## 🧩 Descrição das Pastas

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
