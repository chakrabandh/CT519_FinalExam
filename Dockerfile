# syntax=docker/dockerfile:1.4
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install ALL dependencies (including devDependencies for Tailwind)
RUN npm install

# Copy source code
COPY . .

# Create data directory with proper permissions
RUN mkdir -p data && chmod 755 data

# Build the application (this will compile Tailwind CSS)
RUN npm run build

# Create user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set permissions for data directory
RUN chown -R nextjs:nodejs /app && chmod -R 755 /app/data

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["npm", "start"]