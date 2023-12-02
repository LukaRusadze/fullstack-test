FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV production

COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]