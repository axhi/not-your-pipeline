FROM node:9.2.0

WORKDIR /app
COPY download-repos.sh /app
COPY install-node-packages.sh /app
COPY start-servers.sh /app
COPY start-api-server.sh /app
COPY start-web-server.sh /app

ADD https://api.github.com/repos/axhi/not-your-pipeline/git/refs/heads/master version.json
RUN git clone -b master https://github.com/axhi/not-your-pipeline.git not-your-pipeline/

RUN ./install-node-packages.sh

EXPOSE 3000
EXPOSE 8675

CMD ./start-servers.sh