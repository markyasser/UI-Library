# Step 1: Use an official Node.js image from Docker Hub
FROM node:18.12.0-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy all files into the container
COPY . .

# Step 7: Build the project
RUN npm run build

# Expose port (optional)
EXPOSE 3000

CMD ["npm", "start"]
