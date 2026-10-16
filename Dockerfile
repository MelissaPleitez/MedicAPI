# ==========================================
# STAGE 1: Builder (Compilation)
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy dependency definitions and Prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# 2. Install ALL dependencies (required to compile TypeScript)
RUN npm ci

# 3. Copy application source code
COPY . .

# 4. Generate Prisma Client
RUN npx prisma generate

# 5. Compile TypeScript to JavaScript (runs "tsc" and generates dist/ folder)
RUN npm run build

# ==========================================
# STAGE 2: Runner (Production)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy dependency files and Prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install ONLY production dependencies
RUN npm ci --only=production

# Generate Prisma Client for the production environment
RUN npx prisma generate

# Copy compiled code from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Entry point configured according to package.json (dist/server.js)
CMD ["node", "dist/server.js"]