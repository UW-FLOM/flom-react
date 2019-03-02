FROM ubuntu

# Install main dependencies:
# Postgres, npm and node. We need npm to install yarn in this setup (see below).
# DEBIAN_FRONTEND=noninteractive is require for the build.
# to run non-interactively so that it doesn't ask the user questions.
RUN apt-get update \
&& DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql-10 npm nodejs

# Install yarn with npm do to an ubuntu issue.
# More here: https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install
RUN apt remove cmdtest
RUN apt remove yarn
RUN npm install -g yarn

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