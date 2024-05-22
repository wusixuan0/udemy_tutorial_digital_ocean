FROM node:14-alphine

WORKDIR /app
COPY . .
RUN npm install --production

EXPOSE 8080