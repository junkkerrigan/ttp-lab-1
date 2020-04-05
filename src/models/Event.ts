import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from './modelsStore';

export interface IEvent extends IBaseModel {
    name: string;
    description: string;
}

export interface IEventConstructor extends IBaseModelConstructor {
    new (): Event;
}

export class Event extends BaseModel implements IEvent {
    public name!: string;
    public description!: string;

    static associate(models: ProjectModelsStore) {
        Event.belongsTo(models.Guild, { foreignKey: 'organizer' });
    }
}

Event.initModel({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'events',
});
