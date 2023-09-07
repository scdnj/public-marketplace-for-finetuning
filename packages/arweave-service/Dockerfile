FROM node:16.20.2-alpine3.18

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npx", "ts-node", "src/app.ts" ]