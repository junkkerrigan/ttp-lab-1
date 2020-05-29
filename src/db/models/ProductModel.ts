import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from '../store';
import { Product } from '../../types/domain';

export interface IProductModel extends IBaseModel, Product {}

export interface IProductConstructor extends IBaseModelConstructor {
  new (): ProductModel;
}

export class ProductModel extends BaseModel implements IProductModel {
  public name!: string;
  public description?: string;

  static associate(models: ProjectModelsStore) {
    ProductModel.belongsTo(models.Company, { foreignKey: 'company' });
    ProductModel.hasMany(models.User, { foreignKey: 'product' });
  }
}

ProductModel.initModel(
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'products',
  },
);
