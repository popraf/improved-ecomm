FROM node:lts-hydrogen

# set working directory
WORKDIR /app_frontend

# install app dependencies
COPY /app_frontend/package.json ./
COPY /app_frontend/package-lock.json ./


# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

# Build the app
RUN npm run build
RUN npm install -g serve

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the app
CMD [ "npx", "serve", "-s","build" ]