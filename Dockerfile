FROM node:18-alpine

WORKDIR /api/belajar-api

ENV CONFIG_PATH=.

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "run", "prod"]