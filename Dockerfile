FROM node:alpine

RUN apk update
RUN apk add g++
RUN apk add git
RUN apk add make
RUN apk add bash

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

EXPOSE 8000
CMD [ "npm", "start" ]