'use strict';
// TODO TypeScript化
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventkouho_nichiji extends Model {
    static associate(models) {
      models.eventkouho_nichiji.hasMany(models.sanka_nichiji);
    }
  };
  eventkouho_nichiji.init({
    kouho_nichiji: DataTypes.STRING,
    event_id: DataTypes.BIGINT,
    schedule_update_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'eventkouho_nichiji',
    underscored: true,
  });
  return eventkouho_nichiji;
};