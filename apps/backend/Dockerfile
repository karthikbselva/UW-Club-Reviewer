FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install -g nodemon && npm ci

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]