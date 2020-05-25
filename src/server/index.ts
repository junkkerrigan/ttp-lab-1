require('dotenv').config();

import { app } from './app';

const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});

export { app };
