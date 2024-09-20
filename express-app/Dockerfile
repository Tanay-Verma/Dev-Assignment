FROM node:22

WORKDIR /usr/src/express-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run load_data && npm start"]