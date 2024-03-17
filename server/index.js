import  { config }  from 'dotenv';
config()
import express from "express";
import Database from "./config/connectDb.js";

const app = express();

// connect to db
const db = new Database(process.env.DB_URL, process.env.DB_NAME);
db.connectionDb();

const port = process.env.PORT || 3333;

app.use(express.json());

const server = app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
});
server.on('error', console.error);