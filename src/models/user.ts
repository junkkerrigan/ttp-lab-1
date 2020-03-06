import { DataTypes, Model, ModelCtor, HasManyOptions } from 'sequelize';

import { sequelize } from './sequelize';

class User extends Model {
    constructor() {
        super();
    }

    public readonly id!: number;
    public username!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public status!: string;

    associate<
        M extends Model = Model,
        T extends ModelCtor<M> = ModelCtor<M>
    >(data: Array<{ model: T, options?: HasManyOptions }>) {
        data.forEach(item => User.hasMany(item.model, item.options));
    }
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'users',
    sequelize
});

export { User };