import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { OpenSourceProject } from './OpenSourceProject';

export interface IMaintenance extends IBaseModel {
  maintainerId: number;
  projectId: number;
}

export interface IMaintenanceConstructor extends IBaseModelConstructor {
  new (): Maintenance;
}

export class Maintenance extends BaseModel implements IMaintenance {
  public maintainerId!: number;
  public projectId!: number;
}

Maintenance.initModel(
  {
    contributorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'maintenances',
  },
);
