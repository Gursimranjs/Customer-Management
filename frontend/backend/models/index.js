const sequelize = require("../config/db");

const User = require("./User");
const Customer = require("./Customer");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Define associations
User.hasOne(Customer, { foreignKey: "user_id", onDelete: "CASCADE" });
Customer.belongsTo(User, { foreignKey: "user_id" });

Customer.hasMany(Order, { foreignKey: "customer_id", onDelete: "CASCADE" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

module.exports = {
  sequelize,
  User,
  Customer,
  Order,
  OrderItem,
};