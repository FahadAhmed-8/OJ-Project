# server/Dockerfile
FROM node:20

WORKDIR /usr/src/app

# Copy package files and install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# The command to run your server
CMD ["npm", "run", "dev"]