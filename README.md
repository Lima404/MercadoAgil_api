# MercadoÁgil API

API do projeto **MercadoÁgil** — Node.js, Express, Prisma e PostgreSQL.

---

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started) e Docker Compose
- *(Opcional)* [Node.js](https://nodejs.org/) 18+ e npm — apenas se for rodar sem Docker

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Lima404/MercadoAgil_api.git
cd MercadoAgil_api
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e edite o `.env`:

```bash
cp .env.example .env
```

No `.env`, use a `DATABASE_URL` assim (para rodar com Docker):

```env
DATABASE_URL="postgresql://mercadoagil:mercadoagil@db:5432/mercadoagil?schema=public"
```

### 3. Subir os serviços com Docker

```bash
docker compose up -d
```

Isso sobe o PostgreSQL na porta **5432** e a API na porta **3000**.

### 4. Aplicar as migrations do Prisma

```bash
docker compose exec app npx prisma migrate dev
```

Para criar uma nova migration:

```bash
docker compose exec app npx prisma migrate dev --name nome_da_migration
```

### 5. *(Opcional)* Gerar o Prisma Client

```bash
docker compose exec app npx prisma generate
```

### 6. Verificar

| O quê   | Como |
|--------|------|
| **API** | http://localhost:3000 |
| **Logs** | `docker compose logs -f app` |
| **Parar** | `docker compose down` |

---

## Rodando sem Docker

1. Tenha o PostgreSQL rodando e crie o banco `mercadoagil`.
2. No `.env`, use:  
   `DATABASE_URL="postgresql://usuario:senha@localhost:5432/mercadoagil?schema=public"`
3. Rode:

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

---

## Scripts principais

| Comando        | Descrição |
|----------------|-----------|
| `npm run dev`  | Sobe a API em modo desenvolvimento |
| `npm run build`| Compila o TypeScript para `dist/` |
| `npm run start`| Roda a aplicação compilada (`node dist/index.js`) |

---

## Problemas comuns

- **Connection refused na 5432** — Rode `docker compose up -d` e confira com `docker compose ps`.
- **Authentication failed (postgres)** — Use o usuário `mercadoagil` na `DATABASE_URL`, como no `docker-compose.yml`.
- **Permissão ao apagar migrations** — Use `sudo rm -rf prisma/migrations/*` e em seguida `sudo chown -R "$USER:$USER" prisma/migrations`.
