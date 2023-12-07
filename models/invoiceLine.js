const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/**
 * 
 * Model for the invoice lines table.
 */

class InvoiceLine extends Model {}

InvoiceLine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invoices', 
        key: 'id'
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'InvoiceLine',
  }
);


module.exports = InvoiceLine;
