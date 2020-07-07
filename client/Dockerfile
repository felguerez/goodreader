FROM node:14-alpine AS alpine

WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install only the packages defined in package-lock.json (faster than normal npm install)
RUN npm install

# Copy the contents of the project to the image
COPY . .

#Run `npm start` when the container starts
CMD ["npm", "run", "start"]
