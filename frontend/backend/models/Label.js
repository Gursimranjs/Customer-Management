// models/Label.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Label = sequelize.define("Label", {
  label_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  carrier_name: DataTypes.STRING,
  tracking_number: DataTypes.STRING,
  label_url: DataTypes.STRING,
});

module.exports = Label;
