import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from './modelsStore';

export interface IProduct extends IBaseModel {
    name: string;
    description: string;
}

export interface IProductConstructor extends IBaseModelConstructor {
    new (): Product;
}

export class Product extends BaseModel implements IProduct {
    public name!: string;
    public description!: string;

    static associate(models: ProjectModelsStore) {
        Product.belongsTo(models.Company, { foreignKey: 'company' });
        Product.hasMany(models.User, { foreignKey: 'product' });
    }
}

Product.initModel({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
    },
}, {
    tableName: 'products',
});
