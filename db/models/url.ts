'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../instance';

export class Url extends Model {}

Url.init(
  {
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
    modelName: 'Urls',
    freezeTableName: true,
  }
);
