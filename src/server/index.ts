import { app } from './app';
import { models, sequelize } from '../models';
import { RESET_DB } from './config';

const port = process.env.PORT || 8080;

(async () => {
    await sequelize.sync({ force: RESET_DB });
    try {
        await models.User.create({
            username: 'junkkerrigan',
            password: '726721gfd',
            status: 'figured out'
        });
    } catch (e) {
        console.log(e);
    }
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    })
})();
