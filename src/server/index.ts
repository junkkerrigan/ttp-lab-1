require('dotenv').config();

import { syncSequelize } from '../db';
import { app } from './app';

const port = process.env.SERVER_PORT || 8080;

export const startServer = async () => {
  try {
    await syncSequelize();
    app.listen(port, () => {
      console.log(`Server is running on ${port}.`);
    });
  } catch (e) {
    console.log('Server failed to start:', e);
  }
};

void startServer();
