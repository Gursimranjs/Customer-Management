const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./Customer");

class Order extends Model {}

Order.init(
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
    },
    pickup_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropoff_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    shipping_cost: {
      type: DataTypes.NUMERIC,
      defaultValue: 0.0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false,
  }
);

Customer.hasMany(Order, { foreignKey: "customer_id", onDelete: "CASCADE" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = Order;