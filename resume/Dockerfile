FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/resume
COPY . /var/www/apps/resume

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/resume
COPY --from=builder /var/www/apps/resume/dist /var/www/apps/resume
COPY --from=builder /var/www/apps/resume/node_modules /var/www/apps/resume/node_modules

CMD node /var/www/apps/resume/index.js