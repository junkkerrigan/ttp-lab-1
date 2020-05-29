import { DataTypes } from 'sequelize';
import { BaseModel, IBaseModel } from './BaseModel';

export interface IContribution extends IBaseModel {
  contributorId: number;
  projectId: number;
}

export class Contribution extends BaseModel implements IContribution {
  public contributorId!: number;
  public projectId!: number;
}

Contribution.initModel(
  {
    contributorId: {
      type: DataTypes.INTEGER,
    },
    projectId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'contributions',
  },
);
