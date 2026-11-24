# teste_api

Projeto de automação e testes de API profissional estruturado em Node.js com o test runner do [Playwright](https://playwright.dev/).

---

## 🏛️ Descrição da Arquitetura

Esta estrutura adota o padrão **Service Object Pattern** (equivalente ao *Page Object Pattern* de UI, porém adaptado para APIs REST), fundamentado no princípio de **Separação de Responsabilidades (Separation of Concerns - SoC)**.

O objetivo principal é desacoplar os detalhes técnicos de transporte HTTP (cabeçalhos, URLs, métodos e serialização) da lógica de validação dos testes. Com isso, os testes tornam-se declarativos, altamente legíveis, reutilizáveis e simples de manter quando os contratos de API mudam.

```text
teste_api/
├── .env.example                # Modelo de variáveis de ambiente
├── .gitignore                  # Regras de exclusão do Git
├── package.json                # Dependências, metadados e scripts de teste
├── playwright.config.js        # Configuração global do runner do Playwright
├── README.md                   # Documentação do projeto
├── src/
│   ├── config/
│   │   └── environment.js      # Centralização de configurações e URLs por ambiente
│   ├── data/
│   │   └── payloads/
│   │       └── userPayload.js  # Data Factory para geração dinâmica de massas de teste
│   ├── fixtures/
│   │   └── apiFixture.js       # Injeção de dependência e instâncias de serviços nos testes
│   └── services/
│       ├── BaseService.js      # Wrapper genérico dos métodos HTTP do Playwright
│       └── UserService.js      # Encapsulamento dos endpoints da entidade Usuário
└── tests/
    └── users.spec.js           # Suíte declarativa de testes de API
```

---

## 🎯 Aplicação e Papel de Cada Camada

### 1. Configurações (`src/config/` e `playwright.config.js`)
- **Aplicação**: Centraliza as configurações do runner (timeouts, repórteres, retentativas em CI, paralelismo) e valores dinâmicos de ambiente (URL base, tokens, headers globais).
- **Vantagem**: Permite alternar facilmente entre múltiplos ambientes (Desenvolvimento, Homologação, Produção) apenas alterando variáveis no `.env`.

### 2. Camada de Serviços (`src/services/`)
- **`BaseService.js`**:
  - Abstrai a interface nativa `APIRequestContext` do Playwright.
  - Provê métodos padronizados (`get`, `post`, `put`, `patch`, `delete`) e tratamento unificado de rotas e parâmetros.
- **Serviços Especializados (ex: `UserService.js`)**:
  - Herdam de `BaseService` e representam um recurso ou microserviço da API.
  - Expõem métodos semânticos (ex: `getAllUsers()`, `createUser(data)`, `deleteUser(id)`).
  - **Vantagem**: Se uma rota ou formato de parâmetro mudar no backend, a alteração é feita em apenas um lugar (no respectivo Service), sem necessidade de alterar dezenas de arquivos de teste.

### 3. Injeção por Fixtures (`src/fixtures/`)
- **Aplicação**: Utiliza a capacidade de extensão de fixtures do Playwright (`base.extend`) para instanciar e injetar automaticamente os serviços em cada teste.
- **Vantagem**: Elimina código boilerplate (`beforeEach` manual, instanciação repetitiva) e garante contextos isolados e seguros para execução em paralelo.

### 4. Geração de Massa de Dados (`src/data/payloads/`)
- **Aplicação**: Implementa o padrão **Data Factory** para criação dinâmica de dados de entrada usando timestamps ou identificadores únicos.
- **Vantagem**: Permite testes idempotentes e independentes, evitando colisões de dados (como duplicidade de e-mail ou username) ao rodar testes simultaneamente.

### 5. Camada de Testes (`tests/`)
- **Aplicação**: Focada exclusivamente em validar comportamento de negócio, contratos, regras de status code e integridade de resposta.
- **Vantagem**: Testes limpos e descritivos em alto nível, utilizando o `expect` do Playwright.

---

## 🛠️ Como Estender a Arquitetura (Guia Prático)

Para adicionar testes de um novo recurso (ex: `/products`):

1. **Criar o Service**: crie `src/services/ProductService.js` estendendo `BaseService`.
2. **Criar os Payloads**: crie `src/data/payloads/productPayload.js` com geradores de dados para produtos.
3. **Registrar na Fixture**: adicione `productService` em `src/fixtures/apiFixture.js`.
4. **Criar os Testes**: crie `tests/products.spec.js` consumindo `{ test, expect }` da fixture e recebendo `{ productService }`.

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm, yarn ou pnpm

---

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Adriel-PS/teste_api.git
cd teste_api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo de ambiente:
```bash
cp .env.example .env
```

---

## 🧪 Executando os Testes

- **Executar todos os testes no terminal**:
```bash
npm test
```

- **Executar no modo interativo (UI Mode do Playwright)**:
```bash
npm run test:ui
```

- **Visualizar o relatório de execução gerado**:
```bash
npm run test:report
```

---

## 📄 Licença

Este projeto está sob a licença ISC.
