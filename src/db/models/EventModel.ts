import { DataTypes } from 'sequelize';

import { Event } from '../../types/domain';
import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from '../store';

export interface IEventModel extends IBaseModel, Event {}

export interface IEventConstructor extends IBaseModelConstructor {
  new (): EventModel;
}

export class EventModel extends BaseModel implements IEventModel {
  public name!: string;
  public description?: string;

  static associate(models: ProjectModelsStore) {
    EventModel.belongsTo(models.Guild, { foreignKey: 'organizer' });
  }
}

EventModel.initModel(
  {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: 'name is too long',
          args: [1, 50],
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          msg: 'description is too long',
          args: [0, 200],
        },
      },
    },
  },
  {
    tableName: 'events',
  },
);
