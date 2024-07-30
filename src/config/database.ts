import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const { HOST, USER, PASSWORD, DATABASE, PORT_DATABASE_CONNECTION, SSL } = process.env;

const sequelize = new Sequelize({
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    host: HOST,
    port: +PORT_DATABASE_CONNECTION!,
    ssl: SSL === 'REQUIRED' ? true : false,
    dialect: 'mysql',
});

export default sequelize;
