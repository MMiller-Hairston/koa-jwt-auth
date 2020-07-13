FROM node:12

ENV PORT=3031 \
    DB_CONNECTION_STRING="" \
    JWT_SECRET="" \
    KEY="" \
    CERT="" \
    NODE_ENV="development"

#Set working directory for app
WORKDIR /usr/src/app

COPY package*.json .

# Install dependencies
RUN yarn install

ADD . .

RUN yarn build

EXPOSE ${PORT}
CMD [ "node", "dist/src/server.js" ]