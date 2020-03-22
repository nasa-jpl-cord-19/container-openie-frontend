FROM node as build

COPY ./frontend /app
WORKDIR /app

RUN npm install && npm run-script build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html