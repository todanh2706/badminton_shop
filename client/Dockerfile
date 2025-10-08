# Stage 1: Build the React app
FROM node:18-alpine AS builder
WORKDIR /app
# For deployment ---- 
# COPY client/package*.json ./
# COPY client ./
# -------------------
# For docker test --
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
