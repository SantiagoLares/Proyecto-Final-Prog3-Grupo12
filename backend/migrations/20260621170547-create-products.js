'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      sku: {                     // SKU es un código único de inventario para el producto
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2), // Permite números con hasta 2 decimales (ej: 1500.50)
        allowNull: false,
        defaultValue: 0                 // Si no pasamos precio, arranca en 0 por defecto
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      stockMinimo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      // Foreign Key, conecta el producto con su categoría correspondiente
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',   // Apunta a la tabla 'categories'
          key: 'id'              // Se enlaza con la columna 'id'
        },
        onUpdate: 'CASCADE',     // Si cambia el ID de la categoría, se actualiza acá también
        onDelete: 'SET NULL'     // Si se borra la categoría, el producto no se borra, su categoría queda en NULL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};