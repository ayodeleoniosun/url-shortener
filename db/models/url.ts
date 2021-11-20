'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../instance';

export class Url extends Model {
  public id: number;
  public short_code: string;
  public original_url: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export interface UrlModel {
  short_code: string;
  original_url: string;
}

export const urlAttributes: any = ['id', 'short_code', 'original_url', 'createdAt', 'updatedAt'];

Url.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    short_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    original_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Url',
    freezeTableName: true,
  }
);
