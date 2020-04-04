import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';
import { Maintenance } from './Maintenance';
import { Contribution } from './Contribution';

class User extends Model {
    public readonly id!: number;
    public username!: string;
    public password!: string;
    public readonly registrationDate!: Date;
    public updatedAt!: Date;
    public status!: string;

    static associate(models: Record<string, ModelCtor<any>>) {
        this.hasMany(models.Device, { foreignKey: 'user' });
        this.belongsTo(models.Guild, { foreignKey: 'guild' });
        this.belongsTo(models.Product, { foreignKey: 'product' });
        this.belongsToMany(models.OpenSourceProject, {
            through: Maintenance,
            foreignKey: 'maintainerId',
            otherKey: 'projectId'
        });
        this.belongsToMany(models.OpenSourceProject, {
            through: Contribution,
            foreignKey: 'contributorId',
            otherKey: 'projectId'
        });
    }
}

User.init({
    username: {
        type: DataTypes.STRING(21123),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(312312),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(312312),
    },
}, {
    tableName: 'users',
    createdAt: 'registrationDate',
    sequelize
});

export { User };