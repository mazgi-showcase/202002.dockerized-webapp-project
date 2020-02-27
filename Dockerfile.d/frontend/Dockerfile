FROM node:12-alpine as base

# ================================
# Begin builder stage
FROM base as builder
COPY rootfs /
WORKDIR /workspace
RUN npm install\
  && npm run test\
  && npm run build\
  && mkdir -p /app\
  && tar c .next/ node_modules/ package.json | tar x -C /app
# End builder stage
# ================================

# ================================
# Begin production stage
FROM base as production
# See https://github.com/nodejs/docker-node/blob/8bcc1712f430dcf5f22fffd6aef3db82698c296c/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "run", "start"]
# End production stage
# ================================
