import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';

export class Guild extends Model {
    public name!: string;
    public description!: string;

    static associate(models: Record<string, ModelCtor<any>>) {
        Guild.hasMany(models.Event, { foreignKey: 'guild' });
        Guild.hasMany(models.User, { foreignKey: 'guild' })
    }
}

Guild.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
}, {
    tableName: 'guilds',
    sequelize
});
