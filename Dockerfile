###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2022-03-05                                              ##
## version         : 2.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
ARG NODE_VERSION=18.16.1

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

RUN apk update && apk add build-base git curl
RUN apk add --no-cache python3 g++ build-base cairo-dev jpeg-dev pango-dev musl-dev giflib-dev pixman-dev pangomm-dev libjpeg-turbo-dev freetype-dev
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.compile.json .barrelsby.json ./


RUN pnpm install --frozen-lockfile

COPY ./src ./src


RUN pnpm run build

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN npm install -g pnpm
RUN apk update && apk add build-base git curl
RUN apk add --no-cache python3 g++ build-base cairo-dev jpeg-dev pango-dev musl-dev giflib-dev pixman-dev pangomm-dev libjpeg-turbo-dev freetype-dev
RUN npm install -g pm2

COPY --from=build /opt .

RUN pnpm install --frozen-lockfile --prod

COPY processes.config.js .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]
