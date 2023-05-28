FROM node:16.14-alpine
WORKDIR /meu-time
COPY . .
RUN npm install
CMD ["npm", "start"]