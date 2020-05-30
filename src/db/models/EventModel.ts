import { DataTypes, Op } from 'sequelize';

import { Event } from '../../types/domain';
import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { models } from '../store';
import { GuildModel } from './GuildModel';

export interface IEventModel extends IBaseModel, Event {}

export interface IEventConstructor extends IBaseModelConstructor {
  new (): EventModel;
}

export class EventModel extends BaseModel implements IEventModel {
  name!: string;
  description?: string;
  interestedGuilds!: number[];
  interestedGuildNames!: string[];
}

EventModel.initModel<EventModel>(
  {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: 'name is too long',
          args: [1, 50],
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          msg: 'description is too long',
          args: [0, 200],
        },
      },
    },
    interestedGuilds: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      defaultValue: [],
    },
    interestedGuildNames: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    hooks: {
      beforeCreate: async (event) => {
        const guilds = await models.Guild.findAll<GuildModel>({
          where: {
            id: {
              [Op.in]: event.interestedGuilds,
            },
          },
        });
        event.interestedGuildNames = guilds.map((guild) => guild.name);
      },
    },
    tableName: 'events',
  },
);
