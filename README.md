## 🎯 Resumo Prático — Arquitetura MVVM

| **Tipo de código** | **Onde fica** |
|--------------------|---------------|
| Regras de negócio, banco de dados | 🧱 **Model** |
| Lógica de exibição, estados da tela | 🎨 **ViewModel** |
| Layout, botões, HTML, interface | 🪟 **View** |
| Definição das rotas (URLs, páginas) | 🗺️ **Roteador (separado)** |

---

### 🧩 Explicação rápida

- **Model:** responsável pelos dados e pela lógica de negócio.  
- **ViewModel:** faz a ponte entre o Model e a View, controlando o estado e a lógica de apresentação.  
- **View:** exibe os dados na interface e recebe ações do usuário.  
- **Roteador:** gerencia as páginas e URLs da aplicação, mantendo as rotas separadas da lógica de exibição.
