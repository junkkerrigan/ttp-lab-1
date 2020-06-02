import { models } from '../db';

declare global {
  namespace Express {
    interface Request {
      context: {
        jwtSecret: string;
        models: typeof models;
      };
    }
  }
}
