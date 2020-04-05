import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { ProjectModelsStore } from './modelsStore';

export interface IDevice extends IBaseModel {
    type: string;
    manufacturer: string;
    model: string;
}

export interface IDeviceConstructor extends IBaseModelConstructor {
    new (): Device;
}

export class Device extends BaseModel implements IDevice {
    public type!: string;
    public manufacturer!: string;
    public model!: string;

    static associate(models: ProjectModelsStore) {
        Device.belongsTo(models.User, { foreignKey: 'user' });
    }
}

Device.initModel({
    type: {
        type: DataTypes.STRING,
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'devices',
});
