import { Client } from "pg";
import { connectDb } from "./db/connect-db";
import { start } from "./routing";

connectDb().then((client: Client) => start(client));
