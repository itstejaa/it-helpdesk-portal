# Use the official lightweight Nginx image to serve our static website.
FROM nginx:1.27-alpine

# Copy the website files into Nginx's default public directory.
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Nginx listens on port 80 inside the container.
EXPOSE 80
