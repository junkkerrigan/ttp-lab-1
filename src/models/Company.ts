import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';

export class Company extends Model {
    public readonly id!: number;
    public name!: string;
    public description!: string;
    public chief!: string;

    static associate(models: Record<string, ModelCtor<any>>) {
        Company.hasMany(models.Product, { foreignKey: 'company' });
    }
}

Company.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    chief: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'companies',
    sequelize
});
