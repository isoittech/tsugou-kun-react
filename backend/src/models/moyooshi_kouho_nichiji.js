'use strict';
// TODO TypeScript化
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoyooshiKouhoNichiji extends Model {
    static associate(models) {
      models.MoyooshiKouhoNichiji.hasMany(models.SankaNichiji);
      models.MoyooshiKouhoNichiji.belongsTo(models.Moyooshi);
    }
  };
  MoyooshiKouhoNichiji.init({
    kouho_nichiji: DataTypes.STRING,
    moyooshi_id: DataTypes.BIGINT,
    schedule_update_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MoyooshiKouhoNichiji',
    underscored: true,
  });
  return MoyooshiKouhoNichiji;
};