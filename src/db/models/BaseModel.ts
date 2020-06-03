import {
  Model,
  ModelCtor,
  ModelAttributeColumnOptions,
  InitOptions,
  ModelAttributes,
} from 'sequelize';

import { sequelize } from '../sequelize';
import { ProjectModelsStore } from '../store';
import { PREFER_RESTRICT_NULL } from '../config';

export interface IBaseModel {
  readonly id: number;
  readonly registrationDate: Date;
  updatedAt: Date;
}

export interface IBaseModelConstructor extends ModelCtor<BaseModel> {
  associate(models: ProjectModelsStore): void;
  associations: Record<string, any>;
  initModel(attributes: ModelAttributes, options: Partial<InitOptions>): void;
}

export abstract class BaseModel extends Model implements IBaseModel {
  readonly id!: number;
  readonly registrationDate!: Date;
  updatedAt!: Date;

  static initModel<M extends BaseModel = BaseModel>(
    attributes: ModelAttributes,
    options: Partial<InitOptions<M>>,
  ) {
    if (PREFER_RESTRICT_NULL) {
      attributes = Object.entries(attributes).reduce<ModelAttributes>(
        (acc, [key, value]) => {
          value = value as ModelAttributeColumnOptions;
          if (typeof value.allowNull !== 'boolean') {
            value.allowNull = false;
          }
          return {
            ...acc,
            [key]: value,
          };
        },
        {},
      );
    }
    super.init.call(this as any, attributes, {
      sequelize,
      createdAt: 'registrationDate',
      ...options,
    } as any);
  }
}
