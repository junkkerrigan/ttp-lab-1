import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from '../store';

export interface ICompany extends IBaseModel {
    name: string;
    description: string;
    chief: string;
}

export interface ICompanyConstructor extends IBaseModelConstructor {
    new (): Company;
}

export class Company extends BaseModel implements ICompany {
    public name!: string;
    public description!: string;
    public chief!: string;

    static associate(models: ProjectModelsStore) {
        Company.hasMany(models.Product, { foreignKey: 'company' });
    }
}

Company.initModel({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    chief: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'companies',
});
