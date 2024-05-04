FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]


# # Use Node.js 14 LTS as base image
# FROM node:21
# # FROM node:14-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the Next.js app for production
# RUN npm run build

# # Expose the port Next.js is running on (usually 3000)
# EXPOSE 3000

# # Set environment variable to prevent Next.js from asking questions during build
# # ENV NEXT_TELEMETRY_DISABLED 1

# # Command to run the Next.js app
# CMD ["npm", "start"]
