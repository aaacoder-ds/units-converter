# Use nginx:alpine as base image for serving static files
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy the Unit Converter directory contents to nginx html directory
COPY Unit\ Converter/ ./

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]