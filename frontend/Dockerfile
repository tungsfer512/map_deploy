FROM node:16.16.0
WORKDIR /frontend
COPY package.* ./
RUN npm install
COPY . /frontend/
EXPOSE 7777
CMD [ "npm", "run", "start" ]