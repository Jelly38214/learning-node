FROM node:14
WORKDIR /app
COPY . /app
EXPOSE 8080
CMD node ./src/short-link.js
