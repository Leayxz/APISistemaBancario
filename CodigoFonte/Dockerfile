FROM node:22

WORKDIR /DiretorioContainer

COPY ./FrontEnd ./

COPY ./CodigoFonte ./

COPY ./CodigoFonte/package*.json ./

RUN npm install

CMD ["node", "CodigoFonte/2.Principal.js"]
