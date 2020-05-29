import { DataTypes } from 'sequelize';

import { ProjectModelsStore } from '../store';
import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { Device } from '../../types/domain';

export interface IDeviceModel extends IBaseModel, Device {}

export interface IDeviceModelConstructor extends IBaseModelConstructor {
  new (): DeviceModel;
}

export class DeviceModel extends BaseModel implements IDeviceModel {
  public type!: string;
  public manufacturer!: string;
  public model!: string;

  static associate(models: ProjectModelsStore) {
    DeviceModel.belongsTo(models.User, { foreignKey: 'user' });
  }
}

DeviceModel.initModel(
  {
    type: {
      type: DataTypes.STRING,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'devices',
  },
);
