FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE $BACKEND_PORT

CMD ["node","build/server.js"]
