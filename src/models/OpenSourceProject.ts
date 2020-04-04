import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from './sequelize';
import { Maintenance } from './Maintenance';
import { Contribution } from './Contribution';

class OpenSourceProject extends Model {
    public readonly id!: number;
    public name!: string;
    public description!: string;
    public stars!: number;

    static associate(models: Record<string, ModelCtor<any>>) {
        OpenSourceProject.belongsToMany(models.User, {
            through: Maintenance,
            foreignKey: 'projectId',
            otherKey: 'maintainerId'
        });
        OpenSourceProject.belongsToMany(models.User, {
            through: Contribution,
            foreignKey: 'projectId',
            otherKey: 'contributorId'
        });
    }
}

OpenSourceProject.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    stars: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    tableName: 'open_source_projects',
    sequelize
});

export { OpenSourceProject };