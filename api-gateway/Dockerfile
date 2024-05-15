FROM node:20

WORKDIR /app/api-gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
