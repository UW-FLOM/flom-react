FROM ubuntu
RUN apt-get update \
&& apt-get install -y postgresql-10 yarn nodejs

WORKDIR /app

# Move the app to the container
RUN mkdir client
RUN mkdir server
COPY /client/build/ client/build
COPY /server/ server
COPY ./package.json .

# Set up app dependencies
RUN pwd
RUN ls
RUN which yarn
RUN yarn setup

# Move the startup script
COPY bin/start.sh /bin/start.sh
RUN chmod 755 /bin/start.sh

# Set up postgres
RUN mkdir /postgres
RUN chown postgres:postgres /postgres
USER postgres
RUN /usr/lib/postgresql/10/bin/initdb -D /postgres/
ENV PGDATA "/postgres"

# App will run on port 3000
EXPOSE 3000

ENTRYPOINT ["/bin/start.sh"]