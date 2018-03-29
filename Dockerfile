FROM node:9.2.0-alpine

ADD . /app
WORKDIR /app

ENV NODE_ENV=development
ENV NODE_CONFIG_DIR /app/src/config

RUN cd /app && npm install --production

EXPOSE 3000

CMD ["npm", "start"]
