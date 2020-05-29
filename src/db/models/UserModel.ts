import { DataTypes } from 'sequelize';

import { Maintenance } from './Maintenance';
import { Contribution } from './Contribution';
import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from '../store';
import { User } from '../../types/domain';

export interface IUserModel extends IBaseModel, User {}

export interface IUserModelConstructor extends IBaseModelConstructor {
  new (): UserModel;
}

export class UserModel extends BaseModel implements IUserModel {
  public username!: string;
  public password!: string;
  public status?: string;

  static associate(models: ProjectModelsStore) {
    this.hasMany(models.Device, { foreignKey: 'user' });
    this.belongsTo(models.Guild, { foreignKey: 'guild' });
    this.belongsTo(models.Product, { foreignKey: 'product' });
    this.belongsToMany(models.OpenSourceProject, {
      through: Maintenance,
      foreignKey: 'maintainerId',
      otherKey: 'projectId',
    });
    this.belongsToMany(models.OpenSourceProject, {
      through: Contribution,
      foreignKey: 'contributorId',
      otherKey: 'projectId',
    });
  }
}

UserModel.initModel(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
  },
);
