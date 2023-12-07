const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('../models/user')

/**
 * 
 * Model for the invoices table.
 */

class Invoice extends Model {}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Outstanding', 'Paid', 'Void'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Assuming the description could be optional
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'invoice',
  }
);




module.exports = Invoice;
