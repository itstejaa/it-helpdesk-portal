# IT Helpdesk Portal — Project 1

A beginner-friendly static IT helpdesk portal built with HTML, CSS and JavaScript. It is served by Nginx inside a Docker container.

## What the application does
- Displays a helpdesk dashboard.
- Allows an employee to submit a support ticket.
- Shows ticket counts and recent tickets.
- Saves demo tickets in the browser's localStorage.

**Important:** This is a frontend learning project. Tickets are stored only in the browser that submitted them. There is no backend, shared database, authentication or real ticket workflow yet. Those will be introduced in later projects.

## Run locally without Docker
Open `index.html` in a browser. For a more realistic local web server, run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Developer handoff — DevOps tasks
1. Create a GitHub repository and push this project.
2. On your Linux/GCP VM, clone the repository.
3. Build a Docker image from the Dockerfile.
4. Run a container and map host port 8080 to container port 80.
5. Open `http://YOUR_EXTERNAL_IP:8080` in Chrome.
6. If it does not load, troubleshoot container status, logs, port mapping, VM firewall and cloud firewall rules.

## Docker commands (use these as your deployment checklist)

```bash
# Build an image. Run this from the project directory.
docker build -t it-helpdesk:v1 .

# Confirm the image exists.
docker images

# Run the application in the background.
docker run -d --name helpdesk -p 8080:80 it-helpdesk:v1

# Check the running container.
docker ps

# View application/container logs.
docker logs helpdesk

# Stop and remove the container.
docker stop helpdesk
docker rm helpdesk
```

Then open `http://localhost:8080` on the Docker host, or `http://YOUR_EXTERNAL_IP:8080` from your computer.

## Git commands

```bash
git init
git add .
git commit -m "Initial IT Helpdesk Portal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If your VM is in Google Cloud, allow inbound TCP traffic on port 8080 using a narrowly scoped firewall rule for your learning VM. Also check the VM's VPC firewall rules and host firewall. Do not expose databases or admin services publicly.

## Troubleshooting hints
- `docker: command not found`: Docker is not installed or not in PATH.
- `port is already allocated`: another process/container is using host port 8080. Check `sudo ss -ltnp | grep :8080` and choose another host port if needed.
- Browser times out: check `docker ps`, `docker logs helpdesk`, `-p 8080:80`, the VM external IP and cloud firewall ingress rule.
- Nginx welcome page appears: confirm you built from this project directory and copied `index.html` into the image.

## Next release
Project 2 will add a Java Spring Boot API and a database. We will then containerize multiple services and create a Docker network.
