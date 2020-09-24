'use strict';

// TODO TypeScript化

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moyooshi extends Model {
    static associate(models) {
      models.Moyooshi.hasMany(models.Sankasha);
      models.Moyooshi.hasMany(models.MoyooshiKouhoNichiji);
    }
  };
  Moyooshi.init({
    name: DataTypes.STRING,
    memo: DataTypes.STRING,
    schedule_update_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Moyooshi',
    underscored: true,
    tableName: 'moyooshis'
  });
  return Moyooshi;
};