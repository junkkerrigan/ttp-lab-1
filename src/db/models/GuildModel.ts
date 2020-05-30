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
  interestingEvents!: number[];

  static associate(models: ProjectModelsStore) {
    GuildModel.hasMany(models.User, { foreignKey: 'guild' });
  }
}

GuildModel.initModel(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    interestingEvents: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      defaultValue: [],
    },
  },
  {
    tableName: 'guilds',
  },
);
