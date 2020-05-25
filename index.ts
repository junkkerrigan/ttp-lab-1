import { sequelize } from './src/models';
import { app } from './src/server';
import { RESET_DB } from './config';

export const server = async () => {
  try {
    await sequelize.sync({ force: RESET_DB });
  } catch (e) {
    console.log('error: ', e);
  }
  app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
  });
};
