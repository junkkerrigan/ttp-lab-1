import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';

export class Device extends Model {
    public readonly id!: number;
    public type!: string;
    public manufacturer!: string;
    public model!: string;

    static associate(models: Record<string, ModelCtor<any>>) {
        Device.belongsTo(models.User, { foreignKey: 'user' });
    }
}

Device.init({
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
    sequelize
});
