# Sistema de Gerenciamento de Clínica

Este é um sistema completo para gerenciamento de clínica médica, desenvolvido com tecnologias modernas e boas práticas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para construção de aplicações escaláveis
- **GraphQL** - API Query Language para consultas e mutações
- **Prisma** - ORM moderno para banco de dados
- **JWT** - Autenticação e autorização
- **Swagger** - Documentação da API
- **TypeScript** - Superset JavaScript com tipagem estática

### Frontend
- **Next.js** - Framework React para produção
- **React** - Biblioteca para construção de interfaces
- **TailwindCSS** - Framework CSS utilitário
- **Apollo Client** - Cliente GraphQL
- **Radix UI** - Componentes de interface acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **TypeScript** - Superset JavaScript com tipagem estática

## 📁 Estrutura do Projeto

O projeto está organizado em duas partes principais:

### Backend (`/backend`)
- Arquitetura modular com NestJS
- API GraphQL para comunicação com o frontend
- Sistema de autenticação JWT
- ORM Prisma para gerenciamento do banco de dados
- Documentação automática com Swagger
- Testes unitários e de integração

### Frontend (`/frontend`)
- Interface moderna e responsiva
- Componentes reutilizáveis com Radix UI
- Gerenciamento de estado com Apollo Client
- Estilização com TailwindCSS
- Formulários com React Hook Form e validação Zod
- Sistema de temas claro/escuro
- Componentes de UI modernos e acessíveis

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (versão LTS)
- Docker e Docker Compose
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/nicolasbaldoino/clinic-management-system.git
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

4. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env` em ambos os diretórios
- Preencha as variáveis necessárias

5. Inicie o banco de dados:
```bash
docker-compose up -d
```

6. Execute as migrações do Prisma:
```bash
cd backend
npx prisma migrate dev
```

7. Inicie o backend:
```bash
cd backend
npm run start:dev
```

8. Inicie o frontend:
```bash
cd frontend
npm run dev
```

## 📝 Documentação

- A documentação da API está disponível em `/api/docs` quando o backend estiver em execução
- A documentação do GraphQL está disponível em `/graphql` quando o backend estiver em execução


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
