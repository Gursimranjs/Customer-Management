// models/Invoice.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Invoice = sequelize.define("Invoice", {
  invoice_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sub_total: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0.00,
  },
  tax: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0.00,
  },
  shipping_cost: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0.00,
  },
  total: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0.00,
  },
  payment_status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // "pending", "paid"
  }
});

module.exports = Invoice;
