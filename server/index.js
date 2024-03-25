import express from "express";
import  { config }  from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import cors from "cors"
import Database from "./config/connectDb.js";
import authRoute from './routes/auth.route.js'
import carOwnerRoute from './routes/carOwner.route.js'
import MechanicRoute from './routes/mechanic.route.js'
const app = express();





// connect to db
const db = new Database(process.env.DB_URL, process.env.DB_NAME);
db.connectionDb();

const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/carowners', carOwnerRoute);
app.use('/api/mechanic', MechanicRoute);


const server = app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
});
server.on('error', console.error);