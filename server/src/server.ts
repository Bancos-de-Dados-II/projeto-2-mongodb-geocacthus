import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/sequelize';
import { connectMongoDB } from './config/database';
import router from './routes/router';
import cors from 'cors';
import errorMiddleware from './utils/middlewares/errorMiddleware';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000
const server = express();
server.use(cors())
server.use(express.json());
server.use('/api', router);
server.use(errorMiddleware);


server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}\n`);
})

sequelize.sync().then(() => {
    console.log("Database connected successfully");
})

connectMongoDB();