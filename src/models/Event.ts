import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';

export class Event extends Model {
    public readonly id!: number;
    public name!: string;
    public description!: string;

    static associate(models: Record<string, ModelCtor<any>>) {
        Event.belongsTo(models.Guild, { foreignKey: 'organizer' });
    }
}

Event.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'events',
    sequelize
});
