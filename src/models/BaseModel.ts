import {
    Model, ModelCtor, ModelAttributeColumnOptions, InitOptions, ModelAttributes
} from 'sequelize';

import { sequelize } from './sequelize';
import { ProjectModelsStore } from './modelsStore';
import { PREFER_RESTRICT_NULL } from './config';

export interface IBaseModel {
    readonly id: number;
    readonly registrationDate: Date;
    updatedAt: Date;
}

export interface IBaseModelConstructor extends ModelCtor<BaseModel> {
    associate(models: ProjectModelsStore): void;
    initModel(attributes: ModelAttributes, options: Partial<InitOptions>): void;
}

export abstract class BaseModel extends Model implements IBaseModel {
    readonly id!: number;
    readonly registrationDate!: Date;
    updatedAt!: Date;

    static initModel(attributes: ModelAttributes, options: Partial<InitOptions>) {
        if (PREFER_RESTRICT_NULL) {
            attributes = Object.entries(attributes).reduce<ModelAttributes>(
                (acc, [key, value]) => {
                    if (typeof value === 'string') {
                        throw new Error('Attributes cannot be a string.');
                    }

                    if (!(value as ModelAttributeColumnOptions).allowNull) {
                        (value as ModelAttributeColumnOptions).allowNull = false;
                    }
                    return {
                        ...acc,
                        [key]: value
                    }
                }, {}
            );
        }
        super.init.call(
            (this as unknown as ModelCtor<BaseModel>),
            attributes,
            {
                sequelize,
                createdAt: 'registrationDate',
                ...options
            }
        );
    };

    static associate(models: ProjectModelsStore): void {};
}