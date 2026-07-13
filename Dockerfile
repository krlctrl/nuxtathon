# Stage 1: Build
FROM node:22-bookworm-slim AS builder

WORKDIR /app

RUN npm install -g pnpm@9.15.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2: Production
FROM node:22-bookworm-slim

WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Runtime state lives here; mount a volume at /app/.data to persist it.
CMD ["node", ".output/server/index.mjs"]
