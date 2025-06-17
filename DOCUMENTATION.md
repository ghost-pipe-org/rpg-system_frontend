<h1 align="center"> Documentação Front-end: Plataforma para RPG</h1>
<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react" alt="React Version">
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript" alt="TypeScript Version">
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite" alt="Vite Version">
</div>

## Sumário
- [Sumário](#sumário)
- [1. Visão Geral](#1-visão-geral)
  - [1.1 Objetivo](#11-objetivo)
  - [1.2 Tecnologias Utilizadas](#12-tecnologias-utilizadas)
- [2. Estrutura do Projeto](#2-estrutura-do-projeto)
  - [2.1 Descrição Detalhada](#21-descrição-detalhada)
    - [public/](#public)
    - [src/components/](#srccomponents)
    - [src/pages/](#srcpages)
    - [src/routes/](#srcroutes)
    - [src/services/](#srcservices)
- [3. Componentes Principais](#3-componentes-principais)
  - [3.1 SessionCard](#31-sessioncard)
  - [3.2 Button](#32-button)
  - [3.3 LabeledInputs](#33-labeledinputs)
  - [3.4 LayoutComponents](#34-layoutcomponents)
  - [3.5 Title](#35-title)
  - [3.6 Header \& Footer](#36-header--footer)
- [4. Gerenciamento de Estado](#4-gerenciamento-de-estado)
  - [4.1 Formulários](#41-formulários)
- [5. Rotas](#5-rotas)
- [6. Chamadas API](#6-chamadas-api)
- [7. Estilização](#7-estilização)

---

## 1. Visão Geral

### 1.1 Objetivo
Plataforma para gerenciamento de sessões de RPG, proporcionando ferramentas para mestres e jogadores emitirem inscrições e se inscreverem em campanhas.

### 1.2 Tecnologias Utilizadas
- **Desenvolvimento**:
  - React v19.0.0
  - TypeScript v5.7.2
  - Vite v6.2.0 (build tool)
- **Gerenciamento de Estado**:
  - React Hook Form v7.57.0
  - Zod v3.25.5 (validação)
- **Roteamento**: React Router Dom v7.5.1
- **Estilização**: Tailwind CSS v4.1.4
- **HTTP Client**: Axios v1.9.0
- **Testes**: Não definido
- **Ferramentas**:
  - ESLint v8.57.1 + Prettier v3.5.3 (linting e formatação)
  - Lucide React v0.503.0 + React Icons v5.5.0 (ícones)

---

## 2. Estrutura do Projeto

```
public/                   # Arquivos estáticos públicos
src/            
├── components/           # Componentes reutilizáveis
│   ├── Button/           # Componentes de botão
│   ├── Footer/           # Rodapé da aplicação
│   ├── Header/           # Cabeçalho da aplicação
│   ├── Inputs/           # Componentes de formulário
│   ├── Layouts/          # Layouts estruturais
│   ├── SessionCard/      # Cards de sessão de RPG
│   └── Title/            # Componentes de título
├── pages/                # Páginas da aplicação
│   ├── Admin/            # Área administrativa
│   ├── Landing/          # Página inicial
│   ├── Login/            # Autenticação
│   ├── MasterSession/    # Emissão de sessões
│   ├── Register/         # Cadastro de usuários
│   └── Sessions/         # Listagem de sessões
├── routes/               # Configuração de rotas
│   ├── AppRouter.tsx     # Definição principal de rotas
│   └── PrivateRoutes.tsx # Rotas protegidas
├── services/             # Integração com API
├── App.tsx               # Componente raiz
├── global.css            # Estilos globais
└── main.tsx              # Ponto de entrada
```

### 2.1 Descrição Detalhada

#### public/
- Armazena assets estáticos acessíveis publicamente
- Contém:
  - Imagens, ícones e fonts
  - Favicon e manifest
  - Arquivo index.html base

#### src/components/
Componentes reutilizáveis organizados por funcionalidade:
- **Button/**: Implementações de botões com variações de estilo
- **Footer/**: Rodapé com links e informações
- **Header/**: Cabeçalho com navegação e autenticação
- **Inputs/**: Campos de formulário (texto, seleção, etc.)
- **Layouts/**: Estruturas de página (ex: com sidebar)
- **SessionCard/**: Visualização de sessões de RPG
- **Title/**: Componentes de título e cabeçalhos

#### src/pages/
Páginas principais da aplicação:
- **Landing/**: Página de apresentação
- **Login/**: Autenticação de usuários
- **Register/**: Cadastro de novos usuários
- **Sessions/**: Listagem de sessões disponíveis
- **MasterSession/**: Interface do mestre para emissão de sessões
- **Admin/**: Ferramentas administrativas

#### src/routes/
Configuração do roteamento:
- **AppRouter.tsx**: Mapeamento de todas as rotas
- **PrivateRoutes.tsx**: Lógica para rotas autenticadas

#### src/services/
Integração com backend:
- **api.ts**: Configuração base do Axios

---
## 3. Componentes Principais

### 3.1 SessionCard
**Propósito**: Exibir informações resumidas de uma sessão de RPG com capacidade de expansão para detalhes completos e ações administrativas.

**Features**:
- Dois modos de visualização (usuário comum e admin)
- Expansão/colapso de detalhes
- Edição de campos (para admin)
- Aprovação/rejeição de sessões (para admin)
- Validação de dados
- Responsivo e acessível

**Props**:
```typescript
interface SessionCardProps {
  session: Session; // Objeto contendo todos os dados da sessão
  type?: "admin" | "user"; // Tipo de visualização
}
```

**Exemplo de Uso**:
```jsx
<SessionCard 
  session={sessionData} 
  type="admin" 
/>
```

---

### 3.2 Button
**Propósito**: Componente de botão altamente customizável com suporte a múltiplas variantes e estados.

**Features**:
- 4 variantes de estilo (default, red, green, blackneon)
- Estados de loading integrado
- Suporte a ações assíncronas
- Acessibilidade completa (ARIA)
- Tipagem TypeScript robusta

**Props**:
```typescript
type ButtonProps = {
  name: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  variant?: "default" | "red" | "green" | "blackneon";
};
```

**Variantes Pré-definidas**:
- `DefaultButton` - Botão padrão ciano
- `RedButton` - Botão vermelho para ações destrutivas
- `GreenButton` - Botão verde para ações positivas
- `BlackNeonButton` - Botão preto com estilo neon

**Exemplo de Uso**:
```jsx
<GreenButton 
  name="Salvar" 
  onClick={handleSave} 
  isLoading={isSaving}
/>
```

---

### 3.3 LabeledInputs
**Propósito**: Componentes de formulário com label integrado e validação.

**Componentes Incluídos**:
1. **LabeledInput** (modo claro)
   - Suporta texto e select
   - Validação integrada
   - Estilo padrão

2. **LabeledTextarea** (modo claro)
   - Área de texto multi-linha
   - Mesmas features do Input

3. **LabeledInputDark** (modo escuro)
   - Versão com tema escuro
   - Estilo customizado para o design do RPG

4. **LabeledTextareaDark** (modo escuro)
   - Área de texto com tema escuro

**Features Comuns**:
- Suporte a erro de validação
- Labels acessíveis
- Integração com react-hook-form
- Estilos consistentes

**Exemplo de Uso**:
```jsx
<LabeledInputDark
  id="characterName"
  label="Nome do Personagem"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={errors.name}
/>
```

---

### 3.4 LayoutComponents
**Propósito**: Layout base da aplicação com cabeçalho, conteúdo principal e rodapé.

**Features**:
- Background temático com overlay
- Opção de incluir ou não navbar
- Espaçamento consistente
- Design responsivo
- Efeito visual de gradiente sobre imagem de fundo

**Props**:
```typescript
interface LayoutComponentsProps {
  children: ReactNode;
  withNavbar?: boolean;
}
```

**Exemplo de Uso**:
```jsx
<LayoutComponents withNavbar>
  <YourPageContent />
</LayoutComponents>
```

---

### 3.5 Title
**Propósito**: Componente de título estilizado para páginas e seções.

**Features**:
- Estilo pixel art com sombra
- Centralizado por padrão
- Tipografia temática
- Responsivo

**Props**:
```typescript
interface TitleProps {
  name: string;
}
```

**Exemplo de Uso**:
```jsx
<Title name="Criar Nova Sessão" />
```

---

### 3.6 Header & Footer
**Header**:
- Barra de navegação superior
- Logo e menus
- Integração com sistema de autenticação

**Footer**:
- Links importantes
- Informações de copyright
- Links para redes sociais

**Observação**: Ambos são usados automaticamente pelo LayoutComponents, mas podem ser usados separadamente se necessário.

---

## 4. Gerenciamento de Estado

### 4.1 Formulários
Utiliza `react-hook-form` + `zod` para:
- Gerenciamento de estado de formulários
- Validação de dados
- Integração com API

**Exemplo (Login)**:
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});
```

---

## 5. Rotas

| Rota               | Componente        | Descrição                          | Tipo de Rota       |
|--------------------|-------------------|------------------------------------|--------------------|
| `/`                | LandingPage       | Página inicial                     | Pública            |
| `/login`           | Login             | Autenticação de usuários           | Pública            |
| `/cadastro`        | Register          | Cadastro de novos usuários         | Pública            |
| `/sessoes`         | Sessions          | Listagem de sessões de RPG         | Privada*           |
| `/sessoes/criar`   | MasterSessions    | Criação/gestão de sessões          | Privada (Mestre)   |
| `/eventos`         | LandingPage       | Página de eventos (placeholder)    | Pública            |
| `/admin`           | Admin             | Painel administrativo              | Privada (Admin)    |

*Nota: "Privada" indica que requer autenticação, conforme sua implementação em `PrivateRoutes.tsx`*

---

## 6. Chamadas API

Não definido.

---

## 7. Estilização

- **Tailwind CSS**: Utilizado para estilos utilitários
- **Arquivo global.css**: Define:
  - Reset CSS
  - Fontes customizadas
  - Variáveis de cores

---