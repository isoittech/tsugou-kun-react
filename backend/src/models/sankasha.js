'use strict';
// TODO TypeScript化
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sankasha extends Model {
    static associate(models) {
      models.sankasha.hasMany(models.sanka_nichiji);
    }
  };
  sankasha.init({
    name: DataTypes.STRING,
    event_id: DataTypes.BIGINT,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sankasha',
    underscored: true,
  });
  return sankasha;
};