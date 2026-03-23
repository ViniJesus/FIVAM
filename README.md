# 🚀 Front-end Application

## 📌 Visão Geral

Este projeto é o front-end de uma aplicação web desenvolvido com **React + TypeScript + Vite**, com foco em performance, organização e escalabilidade.

A aplicação consome uma API externa e possui funcionalidades como:

- Autenticação de usuários (Login e Cadastro)
- Persistência de sessão via token
- Rotas protegidas
- Consumo de API REST
- Navegação dinâmica entre páginas

---

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS

---

## ⚙️ Setup Inicial

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://backend-fivam.onrender.com
```

### 4. Rodar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## 🏗️ Arquitetura da Aplicação

A estrutura do projeto foi organizada seguindo princípios de separação de responsabilidades e escalabilidade.

### 📁 Estrutura de Pastas

```
src/
 ├── components/
 │   ├── input/
 │   └── ui/
 │       ├── Navbar.tsx
 │       ├── NavBarLogin.tsx
 │       └── RequireAuth.tsx
 │
 ├── hooks/
 │   └── Page_Title.tsx
 │
 ├── lib/
 │
 ├── pages/
 │   ├── dashboard/
 │   ├── login/
 │   ├── posts/
 │   └── register/
 │
 ├── services/
 │   ├── login/
 │   ├── posts/
 │   ├── register/
 │   └── baseApi.ts
 │
 ├── App.tsx
 ├── main.tsx
 └── index.css
```

---

## 📦 Organização por Camadas

### 🔹 Components

Componentes reutilizáveis da interface.

- `input/`: Inputs customizados
- `ui/`: Componentes de layout e controle (Navbar, proteção de rotas)

### 🔹 Pages

Responsável pelas telas da aplicação.

- Cada pasta representa uma funcionalidade
- Exemplo: `login`, `register`, `dashboard`, `posts`

### 🔹 Services

Camada responsável pela comunicação com a API.

- Organização por domínio (login, posts, register)
- Centralização das chamadas HTTP
- Uso de `baseApi.ts` para padronização

### 🔹 Hooks

Contém hooks customizados da aplicação.

- Exemplo: controle de título de página (`Page_Title`)

### 🔹 Lib

Utilitários e funções auxiliares reutilizáveis.

---

## 🔐 Autenticação e Controle de Acesso

A aplicação utiliza autenticação baseada em token.

### Fluxo:

1. Usuário realiza login
2. API retorna um token
3. Token é armazenado (ex: localStorage)
4. Rotas protegidas verificam autenticação

### Proteção de Rotas

O componente `RequireAuth.tsx` é responsável por:

- Verificar se o usuário está autenticado
- Redirecionar para login caso não esteja

---

## 🌐 Consumo de API

A comunicação com a API é centralizada no arquivo:

```
src/services/baseApi.ts
```

### Responsabilidades:

- Definir URL base
- Padronizar métodos HTTP
- Tratar headers (ex: Authorization)

---

## 🔄 Fluxo de Navegação

- Usuário acessa aplicação
- Página inicial direciona para login
- Após login:
  - Redirecionamento para dashboard

- Acesso a páginas protegidas exige autenticação

---

## 📌 Boas Práticas Utilizadas

- Separação por domínio
- Componentização
- Reutilização de código
- Tipagem com TypeScript
- Organização escalável

---

## 🚧 Melhorias Futuras

- Implementar Context API para autenticação global
- Adicionar gerenciamento de estado (ex: Zustand ou Redux)
- Melhorar tratamento de erros
- Adicionar testes automatizados
- Implementar loading global

---

## 📄 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build
```

---

## 📎 Observações

Este projeto foi desenvolvido com foco em aprendizado e boas práticas de desenvolvimento front-end moderno, podendo ser facilmente expandido para aplicações maiores.
