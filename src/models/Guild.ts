import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from './modelsStore';

export interface IGuild extends IBaseModel {
    name: string;
    description: string;
}

export interface IGuildConstructor extends IBaseModelConstructor {
    new (): Guild;
}

export class Guild extends BaseModel implements IGuild {
    public name!: string;
    public description!: string;

    static associate(models: ProjectModelsStore) {
        Guild.hasMany(models.Event, { foreignKey: 'guild' });
        Guild.hasMany(models.User, { foreignKey: 'guild' })
    }
}

Guild.initModel({
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
}, {
    tableName: 'guilds',
});
