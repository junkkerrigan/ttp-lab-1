import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from '../store';
import { Guild } from '../../types/domain';

export interface IGuildModel extends IBaseModel, Guild {}

export interface IGuildModelConstructor extends IBaseModelConstructor {
  new (): GuildModel;
}

export class GuildModel extends BaseModel implements IGuildModel {
  public name!: string;
  public description?: string;

  static associate(models: ProjectModelsStore) {
    GuildModel.hasMany(models.Event, { foreignKey: 'guild' });
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
  },
  {
    tableName: 'guilds',
  },
);
