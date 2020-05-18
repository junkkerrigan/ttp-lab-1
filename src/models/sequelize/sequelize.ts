import { Sequelize } from 'sequelize';
import { config } from './config';

const { DB_NAME, DB_PASSWORD, DB_USER } = config;

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: 'postgres'
    }
);
