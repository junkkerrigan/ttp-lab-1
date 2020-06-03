import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from '../store';
import { Guild } from '../../types/domain';

export interface IGuildModel extends IBaseModel, Guild {}

export interface IGuildModelConstructor extends IBaseModelConstructor {
  new (): GuildModel;
}

export class GuildModel extends BaseModel implements IGuildModel {
  name!: string;
  description?: string;
  interestingEventIds!: number[];
}

GuildModel.initModel(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [0, 30],
          msg: 'nameTooLong',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 300],
          msg: 'descriptionTooLong',
        },
      },
    },
    interestingEventIds: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      defaultValue: [],
    },
  },
  {
    tableName: 'guilds',
  },
);
