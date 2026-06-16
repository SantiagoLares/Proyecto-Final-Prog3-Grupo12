const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150]
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    stockMinimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps: true
  });

  return Product;
};
