# phat-jwat-microservices

npm i -g @nestjs/cli

nest new grpc-server-product
nest new grpc-client-api-gateway

cd ./grpc-server-product
cd ./grpc-client-api-gateway

nest g resource employees

npm install @nestjs/microservices @grpc/grpc-js google-protobuf
npm install -g grpc-tools
npm install ts-proto

# GraphQL
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql