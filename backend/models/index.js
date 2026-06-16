// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

// Modelos
const User = require('./User')(sequelize);
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const Movement = require('./Movement')(sequelize);

// Asociaciones
// Una categoría tiene muchos productos; un producto pertenece a una categoría
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'productos' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categoria' });

// Un producto tiene muchos movimientos; un movimiento pertenece a un producto
Product.hasMany(Movement, { foreignKey: 'productId', as: 'movimientos', onDelete: 'CASCADE' });
Movement.belongsTo(Product, { foreignKey: 'productId', as: 'producto' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Category,
  Product,
  Movement
};
