ARG NODE_VERSION=20.12.0
ENV NODE_ENV production
FROM node:${NODE_VERSION}-alpine
#FROM node:16-alpine
WORKDIR /app
RUN npm install -g @angular/cli@13
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
