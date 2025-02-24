import { Sequelize } from 'sequelize';
import { dbConfig } from './database';

const sequelize = new Sequelize(dbConfig);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

export default sequelize;