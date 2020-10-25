"use strict";
// TODO TypeScript化
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Sankasha extends Model {
        static associate(models) {
            models.Sankasha.hasMany(models.SankaNichiji);
            models.Sankasha.belongsTo(models.Moyooshi);
        }
    }
    Sankasha.init(
        {
            name: DataTypes.STRING,
            moyooshi_id: DataTypes.BIGINT,
            comment: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Sankasha",
            underscored: true,
        }
    );
    return Sankasha;
};
