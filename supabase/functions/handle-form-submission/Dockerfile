FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy function code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the function port
EXPOSE 9000

# Start the function
CMD ["npm", "start"] 