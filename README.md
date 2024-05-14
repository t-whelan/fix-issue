# DATABASE_URL="postgresql://postgres:bob123456@localhost:5433/fix-issue?schema=public"


docker run -d -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=root -d postgres