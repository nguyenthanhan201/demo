# FROM node:18.12 as build

# RUN npm install -g pnpm

# WORKDIR /usr/src/app

# # Copy root package.json and lockfile
# COPY package.json ./
# COPY pnpm-lock.yaml ./

# # Copy the app-shell package.json
# COPY apps/app-shell/package.json ./apps/app-shell/package.json

# RUN pnpm install

# RUN pnpm run build --filter app-shell

# COPY . .

# EXPOSE 3002

# CMD pnpm run dev --filter app-shell

# FROM node:18.12

# ENV NODE_ENV development

# # https://github.com/vercel/turbo/issues/2198
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN apk add --no-cache libc6-compat

# # add turborepo
# RUN yarn global add turbo

# # Set working directory
# WORKDIR /app

# # Install app dependencies
# COPY  ["package.json", "./"] 

# # Copy source files
# COPY . .

# # Install app dependencies
# RUN yarn install

# EXPOSE 3000 3001 3002 6006

# CMD ["yarn", "dev"]

FROM nginx:1.23.3