FROM node:18.16-alpine3.16

WORKDIR /usr/src/app

RUN apk add git

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npx", "ts-node", "--esm" ,"src/app.ts" ]