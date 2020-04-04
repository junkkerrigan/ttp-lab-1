import { DataTypes, Model } from 'sequelize';

import { sequelize } from './sequelize';

export class Contribution extends Model {
    public readonly id!: number;
    public contributorId!: number;
    public projectId!: number;
}

Contribution.init({
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
    tableName: 'contributions',
    sequelize
});
