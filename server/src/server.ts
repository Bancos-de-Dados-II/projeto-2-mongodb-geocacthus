import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/sequelize';
import { connectMongoDB } from './config/database';
import HttpError from './utils/error/httpError';
import cors from 'cors';
import router, { configIndeceServerPoint } from './routes/router';
import errorMiddleware from './utils/middlewares/errorMiddleware';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const server = express();

export const indeceServerPoint = `/api`;
configIndeceServerPoint(indeceServerPoint);

server.use(cors())
server.use(express.json());
server.use(`${indeceServerPoint}`, router);
server.use(errorMiddleware);

sequelize.sync().then(() => {
    console.log("Database connected successfully");
})

connectMongoDB();
