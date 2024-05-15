FROM node:20

WORKDIR /app/film-svc

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 50001

CMD ["npm", "run", "start:dev"]
