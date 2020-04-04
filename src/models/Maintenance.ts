import { DataTypes, Model } from 'sequelize';

import { sequelize } from './sequelize';

export class Maintenance extends Model {
    public readonly id!: number;
    public maintainerId!: number;
    public projectId!: number;
}

Maintenance.init({
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
    tableName: 'maintenances',
    sequelize
});
