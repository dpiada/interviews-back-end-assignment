FROM node:iron AS base

WORKDIR /home/node/workdir

RUN chown node:node /home/node/workdir

USER node:node

COPY docker/run.sh /usr/local/bin/run.sh
COPY docker/wait-for-it.sh /usr/local/bin/wait-for-it.sh
COPY docker/test.sh /usr/local/bin/test.sh

EXPOSE 3000

FROM base as local_dev

CMD ["run.sh", "development"]

FROM base as release

COPY --chown=node:node ./ /home/node/workdir
RUN npm ci

CMD ["run.sh", "production"]