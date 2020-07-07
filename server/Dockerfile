FROM node:14-alpine AS alpine

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install
COPY . .

# Default command
CMD ["npm", "run", "dev"]
