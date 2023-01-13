run this script to create our database,: docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
then run: yarn typeorm migration:run
to redis run: docker run --name redis -p 6379:6379 -d -t redis:alpine