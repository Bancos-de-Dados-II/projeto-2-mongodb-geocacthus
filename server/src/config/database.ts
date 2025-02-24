import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { Options } from 'sequelize';
import mongoose, { set } from 'mongoose';

dotenv.config();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/default_database';

const dbConfig: Options = {
    database: process.env.DB_NAME || 'default_database',
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
};


const connectMongoDB  = async () => {
    console.log(mongoURI);
    mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
};

export { dbConfig, connectMongoDB };