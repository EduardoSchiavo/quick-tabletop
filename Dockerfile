# Stage 1: Build the React app
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

# Baked-in at build time; leave empty to use relative URLs (production via nginx)
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

RUN bun run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
