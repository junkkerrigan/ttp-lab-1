import { models } from '../db';

declare global {
  namespace Express {
    interface Request {
      context: {
        models: typeof models;
      };
    }
  }
}
