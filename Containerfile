FROM node:20-alpine

WORKDIR /app/src

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "npm run start" ]