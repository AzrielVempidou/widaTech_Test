'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceCard.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
      InvoiceCard.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  InvoiceCard.init({
    invoiceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceCard',
  });
  return InvoiceCard;
};