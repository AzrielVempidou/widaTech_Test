'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helper/hash");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already in use. Please choose another email.",
      },
      validate: {
        isEmail: {
          msg: "Invalid email format. Please provide a valid email address.",
        },
        notNull: {
          msg: "email fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "email field is required. Please fill in all the fields.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "password fields are required. Please fill in all the fields.",
        },
        len: {
          msg: "Minimum password length is 5",
          args: [5],
        },
      },
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user)=> {
        const newPassword = hashPassword(user.password);
        user.password = newPassword
      }
    }
  });
  return User;
};