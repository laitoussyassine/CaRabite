FROM node:20-alpine

WORKDIR /app/server

COPY ../package*.json ./

RUN npm install

COPY . .

EXPOSE 3200

CMD ["npm", "run", "dev:back"]