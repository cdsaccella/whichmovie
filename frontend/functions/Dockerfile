FROM node:slim as builder

RUN mkdir -p /app
WORKDIR /app

COPY yarn.lock package.json netlify.toml assert_riddle.js pixelator.js riddle.js ./
RUN yarn install --production=false

CMD ["yarn", "start"]