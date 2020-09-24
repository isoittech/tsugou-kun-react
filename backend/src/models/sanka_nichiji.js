'use strict';
// TODO TypeScript化
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SankaNichiji extends Model {
    static associate(models) {
      models.SankaNichiji.belongsTo(models.Sankasha);
      models.SankaNichiji.belongsTo(models.MoyooshiKouhoNichiji);
    }
  };
  SankaNichiji.init({
    sanka_kahi: {
      type: DataTypes.ENUM('mikaitou','maru','sankaku','batsu'),
      defaultValue: 'mikaitou'
    },
    moyooshi_kouho_nichiji_id: DataTypes.BIGINT,
    sankasha_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'SankaNichiji',
    underscored: true,
  });
  return SankaNichiji;
};