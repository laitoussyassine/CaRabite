import express from "express";
import  { config }  from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import cors from "cors"
import Database from "./config/connectDb.js";
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import MechanicRoute from './routes/mechanic.route.js'
import ReviewRoute from './routes/review.route.js'
import RouteNotFound from './middlwares/RouteNoutFound.js';
import workshopRoute from './routes/workshop.route.js';
// import dataRoutes from './routes/data.route.js';
import citiesRoute from './routes/cities.route.js';
import searchWorkshopsRoutes  from './routes/search.route.js';
import City from './models/CitySchema.js';


const app = express();




console.log(process.env.DB_URL, process.env.DB_NAME);
// connect to db
const db = new Database(process.env.DB_URL, process.env.DB_NAME);

db.connectionDb();

const port = process.env.PORT || 3333;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/mechanic', MechanicRoute);
app.use('/api/reviews', ReviewRoute);
app.use('/api/workshops', workshopRoute);
app.use('/api/cities', citiesRoute);
app.use('/api/findWorkshops', searchWorkshopsRoutes);

app.get('/api/test', (req, res) => {
    const city = new City({
        name: "Marrakech"
    })
    city.save()
    res.status(200).json({
        message: "ok",
        data: city
    });
})
app.use(RouteNotFound);



const server = app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
});
server.on('error', console.error);