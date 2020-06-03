import { DataTypes, Op } from 'sequelize';

import { Event } from '../../types/domain';
import { BaseModel, IBaseModel, IBaseModelConstructor } from './BaseModel';
import { models, ProjectModelsStore } from '../store';
import { GuildModel } from './GuildModel';
import { UserModel } from './UserModel';

export interface IEventModel extends IBaseModel, Event {}

export interface IEventConstructor extends IBaseModelConstructor {
  new (): EventModel;
}

export class EventModel extends BaseModel implements IEventModel {
  name!: string;
  description?: string;
  interestedGuildIds!: number[];
  interestedGuildNames!: string[];
  user!: UserModel;

  /* eslint-disable-next-line */
  static associate(models: ProjectModelsStore) {
    EventModel.associations.User = EventModel.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }
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
    interestedGuildIds: {
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
      afterCreate: async (event) => {
        const interestedGuildIds = event.interestedGuildIds.map((id) =>
          Number(id),
        );
        const guilds = await models.Guild.findAll<GuildModel>({
          where: {
            id: {
              [Op.in]: interestedGuildIds,
            },
          },
        });
        await event.set(
          'interestedGuildNames',
          guilds.map((guild) => guild.name),
        );
        await event.save();

        for (const guild of guilds) {
          await guild.set('interestingEventIds', [
            ...guild.interestingEventIds,
            event.id,
          ]);
          await guild.save();
        }
      },
    },
    tableName: 'events',
  },
);
