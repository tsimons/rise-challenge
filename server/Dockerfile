# Build server
FROM node:lts-alpine AS BUILD

WORKDIR /srv/app

COPY package.json .
COPY package-lock.json .
COPY . .

RUN npm i

CMD npm run start
