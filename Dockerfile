FROM node:20
COPY /node_modules ./node_modules/
COPY /package*.json ./
COPY /dist ./dist/
COPY /tsconfig.build.json ./
COPY /tsconfig.json ./
CMD npm run start:prod