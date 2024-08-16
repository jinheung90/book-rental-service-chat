FROM node:20
COPY package.json .
COPY dist .
CMD npm run start:prod