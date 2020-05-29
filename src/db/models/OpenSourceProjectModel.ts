import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { Maintenance } from './Maintenance';
import { Contribution } from './Contribution';
import { ProjectModelsStore } from '../store';
import { OpenSourceProject } from '../../types/domain';

export interface IOpenSourceProjectModel
  extends IBaseModel,
    OpenSourceProject {}

export interface IOpenSourceProjectModelConstructor
  extends IBaseModelConstructor {
  new (): OpenSourceProjectModel;
}

export class OpenSourceProjectModel extends BaseModel
  implements IOpenSourceProjectModel {
  public name!: string;
  public description?: string;
  public stars!: number;

  static associate(models: ProjectModelsStore) {
    OpenSourceProjectModel.belongsToMany(models.User, {
      through: Maintenance,
      foreignKey: 'projectId',
      otherKey: 'maintainerId',
    });
    OpenSourceProjectModel.belongsToMany(models.User, {
      through: Contribution,
      foreignKey: 'projectId',
      otherKey: 'contributorId',
    });
  }
}

OpenSourceProjectModel.initModel(
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
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'open_source_projects',
  },
);
