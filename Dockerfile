ARG NODE_VERSION=node:20.19.0

FROM $NODE_VERSION-alpine3.20 AS production

RUN apk add g++ make py3-pip
RUN npm install -g pnpm@10.9.0

ENV HOST=0.0.0.0
ENV DIR=/usr/src/app

# Service hostname
ENV NUXT_HOST=0.0.0.0

# Service version
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

# Build variable
ARG GOOGLE_SHEETS_ID=
ARG GOOGLE_SHEETS_RANGE=data!A1:Z1000
ARG GOOGLE_CLIENT_ID=
ARG GOOLE_API_KEY=
ARG CONTENT_URL=https://scontent.finnomena.com
ARG HEADER_VERSION=latest

# Run in production mode
ENV NODE_ENV=production

# create destination directory
WORKDIR $DIR

# Bundle app source
COPY . .

RUN rm -rf node_modules && pnpm install --no-frozen-lockfile
RUN pnpm build


ENTRYPOINT ["node", ".output/server/index.mjs"]
