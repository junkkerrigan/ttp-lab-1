import { models } from '../models';

declare global {
    namespace Express {
        interface Request {
            context: {
                models: typeof models
            }
        }
    }
}
