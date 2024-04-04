
FROM node:18.14.2 AS builder
WORKDIR /usr/local/app
COPY . .
RUN npm install -g @angular/cli
RUN npm install --force
RUN npm run build
EXPOSE 4200
# --host 0.0.0.0 mapeaza ip-ul de browser pe ip-ul containerul de docker
CMD ["ng","serve","--host","0.0.0.0"]