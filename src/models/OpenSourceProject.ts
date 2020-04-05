import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { Maintenance } from './Maintenance';
import { Contribution } from './Contribution';
import { ProjectModelsStore } from './modelsStore';

export interface IOpenSourceProject extends IBaseModel {
    name: string;
    description: string;
    stars: number;
}

export interface IOpenSourceProjectConstructor extends IBaseModelConstructor {
    new (): OpenSourceProject;
}

export class OpenSourceProject extends BaseModel implements IOpenSourceProject {
    public name!: string;
    public description!: string;
    public stars!: number;

    static associate(models: ProjectModelsStore) {
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

OpenSourceProject.initModel({
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
}, {
    tableName: 'open_source_projects',
});
