FROM nginx:stable AS Client

WORKDIR /app

COPY . ./

RUN apt -y update && apt -y install npm
RUN npm install -g n yarn
RUN n lts
RUN npm install --force

RUN yarn build

RUN cp -r build/* /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

ENTRYPOINT exec nginx -g "daemon off;"