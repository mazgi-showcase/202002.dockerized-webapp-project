FROM node:12-alpine as base

# ================================
# Begin builder stage
FROM base as builder
COPY rootfs /
WORKDIR /workspace

# See https://github.com/kelektiv/node.bcrypt.js/issues/615#issuecomment-407300081
RUN apk add --no-cache --virtual deps python build-base\
  && npm install\
  && apk del deps\
  && npm run test\
  && npm run build
# End builder stage
# ================================

# ================================
# Begin production stage
FROM base as production
# See https://github.com/nodejs/docker-node/blob/8bcc1712f430dcf5f22fffd6aef3db82698c296c/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
# COPY --from=builder /workspace/dist/main.js /app/
RUN mkdir -p /data/config/bff/ && echo '{}' > /data/config/bff/config.json
COPY --from=builder /workspace/dist/main.js /app/
CMD ["node", "/app/main.js"]
# End production stage
# ================================
