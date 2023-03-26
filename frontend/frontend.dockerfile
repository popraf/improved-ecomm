FROM node:12
WORKDIR /app_frontend
COPY /app_frontend/package*.json ./
RUN npm install
COPY . .
