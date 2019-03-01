FROM node:8

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm i --silent

EXPOSE 8097

RUN node --version

CMD ["npm", "start"]
