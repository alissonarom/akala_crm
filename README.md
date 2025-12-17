# Projeto Completo: Cliente CRM

Este é um monorepo que contém o frontend (React) e o backend (Node.js/Express/Mongoose).

## 🚀 Estrutura do Projeto

* **`backend/`**: Contém a API RESTful e a lógica de conexão com o MongoDB.
* **`frontend/`**: Contém a aplicação de interface do usuário desenvolvida em React.

## ⚙️ Setup Local

1.  **Instalar Dependências (Na Raiz):**
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    ```
2.  **Configuração de Ambiente:**
    Crie um arquivo `.env` no diretório `backend/` baseado no `backend/.env.example`.
3.  **Rodar o Projeto:**
    ```bash
    # Na pasta backend/
    npm start 

    # Em um novo terminal, na pasta frontend/
    npm start
    ```