FROM node:22 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/project
COPY . /var/www/apps/project

RUN npm install --omit=optional

RUN npm run build


FROM node:22 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/project
COPY --from=builder /var/www/apps/project/dist /var/www/apps/project
COPY --from=builder /var/www/apps/project/node_modules /var/www/apps/project/node_modules

CMD node /var/www/apps/project/index.js