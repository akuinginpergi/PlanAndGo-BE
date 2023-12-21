FROM node:20-alpine

WORKDIR /app/src

COPY . .

RUN npm i

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm run start" ]
