import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';

export class Product extends Model {
    public readonly id!: number;
    public name!: string;
    public description!: string;

    static associate(models: Record<string, ModelCtor<any>>) {
        Product.belongsTo(models.Company, { foreignKey: 'company' });
        Product.hasMany(models.User, { foreignKey: 'product' });
    }
}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'products',
    sequelize
});
