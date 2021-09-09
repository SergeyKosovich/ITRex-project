FROM node:14.17.5

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 8080 

CMD [ "npm", "run", "serve"]