module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define(
    "Inventory",
    {
      inventory_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      customer_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "customers", // Ensure the table name matches exactly
          key: "customer_id",
        },
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      length: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      width: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      height: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      weight: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      quantity_in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "inventory", // Ensures Sequelize maps to the correct table
      timestamps: false, // Disable Sequelize's automatic timestamps
      underscored: true, // Ensures correct column naming (created_at instead of createdAt)
    }
  );

  return Inventory;
};