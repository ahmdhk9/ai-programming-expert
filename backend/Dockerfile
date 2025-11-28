FROM node:20.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --production && npm cache clean --force

COPY . .

ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0

EXPOSE 8000

CMD ["node", "server.js"]
