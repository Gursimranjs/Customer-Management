const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class Customer extends Model {}

Customer.init(
  {
    customer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_address: {
      type: DataTypes.STRING,
    },
    preferences: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: false,
  }
);

User.hasOne(Customer, { foreignKey: "user_id", onDelete: "CASCADE" });
Customer.belongsTo(User, { foreignKey: "user_id" });

module.exports = Customer;