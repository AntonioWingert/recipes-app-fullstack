# Usar a imagem node:16.14-alpine como base
FROM node:16.14-alpine

# Mudar para o diretório de trabalho /app-backend
WORKDIR /app-backend

# Copiar os package.json e package-lock.json para o container
COPY package*.json ./

# Copiar o diretório prisma para o container
COPY prisma ./prisma/

# Copiar o .env para o container
COPY .env ./

# Copiar o tsconfig.json para o container
COPY tsconfig.json ./

# Copiar o restante dos arquivos da aplicação para o container
COPY . .

# Instalar as dependências Node
RUN npm install

# Gerar o prisma client
RUN npx prisma generate

# Sinalize que aplicação expõe a porta 3001
EXPOSE ${env.PORT}

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT ["npm", "run"]
CMD ["start"]

# Dica: Leia a seção Docker e Docker-compose no README para mais informações
