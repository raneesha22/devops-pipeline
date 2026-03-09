# ── Stage 1: base image ──────────────────────────────────────────
# We use the official Node.js 20 Alpine image.
# Alpine is a tiny Linux distro (~5MB) — keeps our container small and fast.
FROM node:20-alpine

# ── Stage 2: set working directory ───────────────────────────────
# All commands from here run inside /app inside the container.
WORKDIR /app

# ── Stage 3: install dependencies ────────────────────────────────
# We copy package.json FIRST (before the rest of the code).
# Docker caches each step — if package.json hasn't changed,
# it skips npm install on the next build. Saves a lot of time.
COPY package*.json ./
RUN npm install --production

# ── Stage 4: copy source code ────────────────────────────────────
COPY . .

# ── Stage 5: expose port ──────────────────────────────────────────
# Tell Docker our app listens on port 3000.
EXPOSE 3000

# ── Stage 6: run the app ──────────────────────────────────────────
CMD ["node", "src/index.js"]