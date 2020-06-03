import { DataTypes } from 'sequelize';
import { ProjectModelsStore } from '../store';
import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { Company } from '../../types/domain';

export interface ICompanyModel extends IBaseModel, Company {}

export interface ICompanyModelConstructor extends IBaseModelConstructor {
  new (): CompanyModel;
}

export class CompanyModel extends BaseModel implements ICompanyModel {
  public name!: string;
  public description?: string;
  public chief!: string;

  static associate(models: ProjectModelsStore) {
    CompanyModel.hasMany(models.Product, { foreignKey: 'companyId' });
  }
}

CompanyModel.initModel(
  {
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
  },
  {
    tableName: 'companies',
  },
);
