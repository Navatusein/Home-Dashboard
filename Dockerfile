FROM node:25-alpine AS base

LABEL org.opencontainers.image.source="https://github.com/Navatusein/Home-Dashboard"

FROM base AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN apk add --no-cache tini

ENV NODE_ENV=production

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 2000 nodejs \
    && adduser --system --uid 2000 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]