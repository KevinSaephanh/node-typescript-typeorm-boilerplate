FROM node:15

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]