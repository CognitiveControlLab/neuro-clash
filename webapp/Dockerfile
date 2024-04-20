# Use Node.js 17 image as base
FROM node:17-alpine AS development

# Set environment variables
ENV NODE_ENV development

# Set the working directory
WORKDIR /src

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project
COPY . .

# Expose port 3000
EXPOSE 3000

# Build the React app
RUN yarn build

# Start the app
CMD ["yarn", "start"]