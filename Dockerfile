FROM node:latest

WORKDIR /app

COPY package*.json /app
RUN npm install

COPY --chown=node:node .env /app
COPY --chown=node:node bot.js /app
COPY --chown=node:node videos /app/videos

USER node

CMD ["node", "bot.js"]