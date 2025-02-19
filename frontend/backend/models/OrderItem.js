const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");
const Inventory = require("./Inventory");

class OrderItem extends Model {}

OrderItem.init(
  {
    order_item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order,
        key: "order_id",
      },
    },
    inventory_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Inventory,
        key: "inventory_id",
      },
    },
    item_description: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unit_price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
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
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: false,
  }
);

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

module.exports = OrderItem;