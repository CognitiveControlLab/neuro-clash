# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine as base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
WORKDIR /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN bun install --frozen-lockfile

# install with --production (exclude devDependencies)
WORKDIR /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN bun install --frozen-lockfile --production

# copy all project files into the image
WORKDIR /usr/src/app
COPY . .

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules

# TODO MAYBE?
# [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
WORKDIR /usr/src/app
COPY --from=install /temp/prod/node_modules node_modules
COPY src/index.ts .
COPY package.json .

# run the app
USER bun
EXPOSE 5000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
