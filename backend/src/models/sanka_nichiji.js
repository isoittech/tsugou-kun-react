'use strict';
// TODO TypeScript化
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sanka_nichiji extends Model {
    static associate(models) {
      models.sanka_nichiji.belongsTo(models.sankasha);
      models.sanka_nichiji.belongsTo(models.eventkouho_nichiji);
    }
  };
  sanka_nichiji.init({
    sanka_kahi: {
      type: DataTypes.ENUM('mikaitou','maru','sankaku','batsu'),
      defaultValue: 'mikaitou'
    },
    event_kouho_nichiji_id: DataTypes.BIGINT,
    sankasha_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'sanka_nichiji',
    underscored: true,
  });
  return sanka_nichiji;
};