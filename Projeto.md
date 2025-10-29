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