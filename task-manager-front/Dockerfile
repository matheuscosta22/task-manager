FROM node:20-alpine

# Set work directory
WORKDIR /app

# Copy package and dependencies
COPY package*.json ./
RUN npm install

# Copy client code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]