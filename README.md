# Front-end Application

## Visão Geral

Este projeto é o front-end de uma aplicação web desenvolvido com **React + TypeScript + Vite**, com foco em performance, organização e escalabilidade.

A aplicação consome uma API externa e possui funcionalidades como:

- Autenticação de usuários (Login e Cadastro)
- Persistência de sessão via token
- Rotas protegidas
- Consumo de API REST
- Navegação dinâmica entre páginas

---

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS

---

## Setup Inicial

### 1. Clonar o repositório

```bash
git clone https://github.com/ViniJesus/FIVAM.git
cd FIVAM
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

## Arquitetura da Aplicação

A estrutura do projeto foi organizada seguindo princípios de separação de responsabilidades e escalabilidade.

### Estrutura de Pastas

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

## Organização por Camadas

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

## Autenticação e Controle de Acesso

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

## Consumo de API

A comunicação com a API é centralizada no arquivo:

```
src/services/baseApi.ts
```

### Responsabilidades:

- Definir URL base
- Padronizar métodos HTTP
- Tratar headers (ex: Authorization)

---

## Fluxo de Navegação

- Usuário acessa a aplicação
- Página inicial exibe todas as postagens públicas
- Usuário pode navegar livremente pelas postagens

- Para realizar ações (criar, editar ou excluir postagens):
  - Usuário é redirecionado para a página de login

- Após autenticação:
  - Usuário é redirecionado para o dashboard
    - Criar postagem
    - Editar postagem
    - Excluir postagem

- O acesso às rotas protegidas requer autenticação via JWT

---

## Boas Práticas Utilizadas

- Separação por domínio
- Componentização
- Reutilização de código
- Tipagem com TypeScript
- Organização escalável

---

## Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build
```

---

## Infraestrutura e Ambientes

A aplicação está distribuída em serviços independentes, utilizando plataformas cloud para hospedagem e gerenciamento de banco de dados.

### Front-End

- **Plataforma:** Render (Free Tier)
- **URL:** https://fivam.onrender.com/
- **Descrição:** Interface da aplicação responsável pela interação com o usuário.

### Back-End

- **Plataforma:** Render (Free Tier)
- **URL:** https://backend-fivam.onrender.com/api-docs/
- **Descrição:** API responsável pelas regras de negócio, autenticação e comunicação com o banco de dados.

### Banco de Dados

- **Serviço:** MongoDB Atlas
- **Cluster:** Cluster0
- **Plano:** Free Tier
- **Projeto:** fivam
- **Descrição:** Armazenamento persistente dos dados da aplicação.

---

## Desafios e Aprendizados

- ### Arquitetura e Segurança

Adotamos os princípios de Arquitetura Limpa (Clean Architecture), assegurando a separação de responsabilidades e a independência da lógica de negócio em relação a frameworks e tecnologias externas.

Controle de Acesso:
Implementamos mecanismos de autorização baseados em perfis de usuário, garantindo que apenas usuários devidamente autenticados e autorizados possam acessar rotas e funcionalidades sensíveis do sistema.

JWT (JSON Web Token):
Utilizamos tokens JWT para autenticação e comunicação segura entre front-end e back-end, garantindo a integridade, autenticidade e confidencialidade das informações trafegadas.

- ### Containerização com Docker

A utilização do Docker foi fundamental para garantir a padronização do ambiente de execução da aplicação.

Consistência de Ambiente:
Eliminamos divergências entre ambientes de desenvolvimento e produção, assegurando previsibilidade no comportamento da aplicação.

Isolamento:
A containerização permite a execução isolada da aplicação, facilitando o onboarding de novos desenvolvedores e a integração com pipelines de integração contínua (CI).

- ### Abordagem “Security-First”

A segurança foi tratada como um pilar fundamental desde o início do desenvolvimento, sendo incorporada em todas as etapas do projeto.

Análise de Vulnerabilidades:
Utilização de ferramentas para identificação e mitigação de vulnerabilidades em tempo de desenvolvimento.

Validação de Entradas:
Implementação de validações rigorosas nos dados de entrada, prevenindo ataques comuns como Injection e Cross-Site Scripting (XSS).

- ### Deploy Contínuo com Render

Implementamos um processo de deploy contínuo (Continuous Deployment - CD) utilizando a plataforma Render.

Automação de Deploy:
Configuração de Webhooks que automatizam o processo de publicação da aplicação a cada atualização na branch principal.

Estabilidade e Resiliência:
Após ciclos de ajustes e validações, o pipeline foi estabilizado, garantindo entregas contínuas, seguras e confiáveis em ambiente de produção.que cada commit na branch principal reflita imediatamente em produção.

---

## Observações

Este projeto foi desenvolvido com foco em aprendizado e boas práticas de desenvolvimento front-end moderno, podendo ser facilmente expandido para aplicações maiores.
