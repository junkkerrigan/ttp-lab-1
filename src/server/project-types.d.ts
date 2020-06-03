import { UserModel } from '../db/models/UserModel';
import { models } from '../db';

declare global {
  namespace Express {
    interface Request {
      context: {
        jwtSecret: string;
        models: typeof models;
        user: UserModel;
      };
    }
  }
}
