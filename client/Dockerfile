# client/Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Expose the Vite port
EXPOSE 5173

# The command to run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]