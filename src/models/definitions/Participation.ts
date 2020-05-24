import { DataTypes } from 'sequelize';

import { BaseModel, IBaseModel } from './BaseModel';

export interface IParticipation extends IBaseModel {
  participantId: number;
  eventId: number;
}

export class Participation extends BaseModel implements IParticipation {
  public participantId!: number;
  public eventId!: number;
}

Participation.initModel(
  {
    participantId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    tableName: 'participations',
  },
);
