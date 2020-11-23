# Build Step
FROM golang:1.15 AS builder

ENV DOCKER_CLI_VER 19.03.4
ENV NODE_VER 14.x
ENV NPM_VER 6
ENV GOLANG_LINT_VER v1.21.0

RUN curl -sL https://deb.nodesource.com/setup_$NODE_VER | bash -
RUN apt-get update

RUN apt-get install -y nodejs postgresql-client netcat
RUN npm install -g npm@$NPM_VER

# CLI Tools
RUN go get github.com/joho/godotenv/cmd/godotenv
RUN go get github.com/magefile/mage
RUN go get github.com/cosmtrek/air
RUN curl -sfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh| sh -s -- -b $(go env GOPATH)/bin $GOLANG_LINT_VER

# Docker CLI
RUN curl -L -o /tmp/docker-$DOCKER_CLI_VER.tgz https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_CLI_VER.tgz \
    && tar -xz -C /tmp -f /tmp/docker-$DOCKER_CLI_VER.tgz \
    && mv /tmp/docker/* /usr/bin

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm ci
RUN node -v 
RUN npm -v 
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 mage build

# Runtime Step
FROM alpine:3.10
RUN apk update && apk add ca-certificates

RUN mkdir /app
WORKDIR /app

COPY --from=builder /app/favicon.png /app
COPY --from=builder /app/migrations /app/migrations
COPY --from=builder /app/views /app/views
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/LICENSE /app
COPY --from=builder /app/robots.txt /app
COPY --from=builder /app/fider /app

EXPOSE 3000

HEALTHCHECK --timeout=5s CMD ./fider ping

CMD ./fider migrate && ./fider