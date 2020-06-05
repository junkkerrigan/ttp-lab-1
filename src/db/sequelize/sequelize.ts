import { Sequelize } from 'sequelize';
import { config } from './config';
import { RESET_DB } from '../config';

const { DB_NAME, DB_PASSWORD, DB_USER } = config;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
});

export const syncSequelize = async (overrideOptions?: { force?: boolean }) => {
  const { force = false } = overrideOptions || {};
  await sequelize.sync({
    force: force || RESET_DB,
  });
};
