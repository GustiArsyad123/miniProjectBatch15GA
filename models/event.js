"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.event.belongsTo(models.user, {
        foreignKey: "userId",
      });

      models.event.belongsTo(models.category, {
        foreignKey: "categoryId",
      });
    }
  }
  event.init(
    {
      title: DataTypes.STRING,
      detail: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "event",
    }
  );
  return event;
};
