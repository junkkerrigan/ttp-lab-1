import { ModelCtor } from 'sequelize';

import { User } from './User';
import { Guild } from './Guild';
import { OpenSourceProject } from './OpenSourceProject';
import { Device } from './Device';
import { Event } from './Event';
import { Product } from './Product';
import { Company } from './Company';

export const models: Record<string, ModelCtor<any> & Record<string, any>> = {
    User,
    Guild,
    OpenSourceProject,
    Device,
    Event,
    Product,
    Company
};

Object.values(models).forEach(model => {
    model.associate && model.associate(models);
});

export { sequelize } from './sequelize';
