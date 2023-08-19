FROM node:16.16.0
WORKDIR /backend
COPY package.* ./
RUN npm install
COPY . /backend/
RUN npm run setupdb
EXPOSE 7000
CMD ["npm", "run", "dev"]