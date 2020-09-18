'use strict';

// TODO TypeScript化

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    static associate(models) {
      models.event.hasMany(models.sankasha);
      models.event.hasMany(models.eventkouho_nichiji);
    }
  };
  event.init({
    name: DataTypes.STRING,
    memo: DataTypes.STRING,
    schedule_update_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
    underscored: true,
  });
  return event;
};