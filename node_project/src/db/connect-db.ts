import { Client } from "pg";

export const connectDb = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "food-orders",
    password: "postgres",
    port: 5432,
  });

  await client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return client;
};
