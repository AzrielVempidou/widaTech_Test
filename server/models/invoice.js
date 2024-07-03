'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.InvoiceCard, { foreignKey: 'invoiceId' });
    }
  }
  Invoice.init({
    date: DataTypes.DATE,
    customerName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "customerName fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "customerName fields are required. Please fill in all the fields.",
        },
      },
    },
    employeeId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "employeeId fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "employeeId fields are required. Please fill in all the fields.",
        },
      },
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    totalAmountPaid: {  type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "totalAmountPaid fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "totalAmountPaid fields are required. Please fill in all the fields.",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};