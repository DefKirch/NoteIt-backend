"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.project, {
        through: "userprojects",
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.INTEGER },
      password: { type: DataTypes.STRING, allowNull: false },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue:
          "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
