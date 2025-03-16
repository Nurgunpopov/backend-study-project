FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/request
COPY . /var/www/apps/request

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/request
COPY --from=builder /var/www/apps/request/dist /var/www/apps/request
COPY --from=builder /var/www/apps/request/node_modules /var/www/apps/request/node_modules

CMD node /var/www/apps/request/index.js