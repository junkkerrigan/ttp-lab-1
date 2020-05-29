import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel } from './BaseModel';

export interface IMaintenance extends IBaseModel {
  maintainerId: number;
  projectId: number;
}

export class Maintenance extends BaseModel implements IMaintenance {
  public maintainerId!: number;
  public projectId!: number;
}

Maintenance.initModel(
  {
    contributorId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    tableName: 'maintenances',
  },
);
