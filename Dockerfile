# FROM node:22-alpine3.18 as dev-deps
# WORKDIR /app
# COPY package.json package.json
# RUN npm install

# FROM node:22-alpine3.18 as builder
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# FROM nginx as prod
# EXPOSE 80
# COPY --from=builder /app/dist/sistema-encuestas-app /usr/share/nginx/html
# CMD [ "nginx", "-g","daemon off;"]

# Etapa de construcción
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/sistema-encuestas-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html
