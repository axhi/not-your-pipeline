FROM node:9.2.0

WORKDIR /app
COPY download-repos.sh /app
COPY install-node-packages.sh /app
COPY start-servers.sh /app
COPY start-api-server.sh /app
COPY start-web-server.sh /app

RUN ./download-repos.sh
RUN ./install-node-packages.sh

EXPOSE 3000
EXPOSE 8080

CMD ./start-servers.sh