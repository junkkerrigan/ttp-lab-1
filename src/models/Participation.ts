import { DataTypes, Model } from 'sequelize';

import { sequelize } from './sequelize';

export class Participation extends Model {
    public readonly id!: number;
    public participantId!: number;
    public eventId!: number;
}

Participation.init({
    participantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'participations',
    sequelize
});
