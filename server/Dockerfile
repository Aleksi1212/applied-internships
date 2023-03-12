FROM node:alpine

WORKDIR /server

COPY package.json .

ENV MARIA_DB_HOST="internship-database.ce68iv8asrox.eu-north-1.rds.amazonaws.com"
ENV MARIA_DB_USER="admin"
ENV MARIA_DB_PASSWORD="Jo9mKWxd1"
ENV MARIA_DB_DATABASE="applied_internships"
ENV ACCESS_TOKEN_SECRET="fc08f0232071c1055403e1521e6aa298585e00819c1e4133ea6f81192b56a5a986090bcfd76939265e4d8ca1b628096c6178986acd3446550255889301ff4fce"
ENV BING_SEARCH_API_KEY="fe2095e031394341a4a6d3db7c43f5cd"
ENV DEEPL_API_KEY="231fd6ec-7b9b-ede9-6258-4fcd43a08930:fx"

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]