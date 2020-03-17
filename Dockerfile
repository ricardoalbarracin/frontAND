FROM node:10 as builder

RUN mkdir /opt/app
WORKDIR /opt/app
COPY . ./
WORKDIR /opt/app/src
RUN npm install
RUN npm install -g @angular/cli@8.1.3
RUN ng build
#RUN yarn; yarn build


FROM nginx:alpine

COPY .docker/nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /opt/app/src/dist/tramites-servicios-spa /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
