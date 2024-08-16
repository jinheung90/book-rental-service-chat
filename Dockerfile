FROM node:20
COPY /node_modules ./node_modules/
COPY /package*.json ./
COPY /dist ./dist/
COPY /tsconfig.build.json ./
COPY /tsconfig.json ./
COPY /.env ./
CMD npm run start:prod