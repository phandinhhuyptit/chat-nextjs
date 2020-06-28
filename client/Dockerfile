FROM node:12.18.1

WORKDIR /chat-realtime/

ADD . /chat-realtime/

RUN yarn install
RUN yarn build

CMD ["yarn","start:prod"] 