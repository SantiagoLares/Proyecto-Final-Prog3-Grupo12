const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movement = sequelize.define('Movement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.ENUM('entrada', 'salida'),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'movements',
    timestamps: true
  });

  return Movement;
};
