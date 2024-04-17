# Use a lightweight Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the container
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5173 to allow external access to the application
EXPOSE 5173

# Command to run the application (npm run dev:front)
CMD ["npm", "run", "dev:front"]
