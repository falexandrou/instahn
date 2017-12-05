FROM node:8.9.1-alpine
MAINTAINER Fotis Alexandrou <falexandrou@gmail.com>

RUN mkdir -p /sources
WORKDIR /sources

ENV PORT 3000

COPY ./package.json /sources/package.json
COPY ./package-lock.json /sources/package-lock.json

RUN ["npm", "install", "--global-style", "--ignore-scripts"]

COPY . /sources

EXPOSE 3000

RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run", "serve"]