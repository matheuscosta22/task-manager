FROM node:20-alpine AS builder

WORKDIR /usr/app

COPY . .

RUN npm install --quit --no-option --no-fund --loglevel=error

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]