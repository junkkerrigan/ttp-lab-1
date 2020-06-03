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
    ProductModel.associations.Company = ProductModel.belongsTo(models.Company, {
      foreignKey: 'companyId',
    });
    ProductModel.hasMany(models.User, { foreignKey: 'productId' });
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
