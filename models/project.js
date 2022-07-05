"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.belongsToMany(models.user, {
        through: "userprojects",
        foreignKey: "projectId",
      });
      project.hasMany(models.task);
    }
  }
  project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      backgroundColor: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "project",
    }
  );
  return project;
};
