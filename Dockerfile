# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
#RUN npm ci
RUN pnpm install


# Copy the entire project to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

ENV NODE_ENV production
# Set the environment variables
ENV PORT=3000

# Expose the specified port
EXPOSE ${PORT}

# Start the Next.js app
CMD ["npm", "start"]