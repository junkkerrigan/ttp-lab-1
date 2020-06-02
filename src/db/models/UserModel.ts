import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

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
  public name?: string;
  public email!: string;
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

UserModel.initModel<UserModel>(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'isNotEmail',
        },
      },
    },
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
    hooks: {
      beforeCreate: async (user) => {
        const rounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const salt = await bcrypt.genSalt(rounds);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    tableName: 'users',
  },
);
