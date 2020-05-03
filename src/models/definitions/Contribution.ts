import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { Maintenance } from './Maintenance';

export interface IContribution extends IBaseModel {
    contributorId: number;
    projectId: number;
}

export interface IContributionConstructor extends IBaseModelConstructor {
    new (): Contribution;
}

export class Contribution extends BaseModel implements IContribution {
    public contributorId!: number;
    public projectId!: number;
}

Contribution.initModel({
    contributorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'contributions',
});
