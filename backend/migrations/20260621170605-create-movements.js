'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.ENUM('entrada', 'salida'), // Solo permite guardar la palabra "entrada" o "salida"
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      motivo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // Foreign Key, conecta este movimiento con el producto afectado
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,        // Un movimiento SÍ O SÍ tiene que tener un producto asignado
        references: {
          model: 'products',     // Apunta a la tabla 'products'
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'      // Si se borra el producto, se borra su historial de movimientos
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
    await queryInterface.dropTable('movements');
    // Esto es un detalle de PostgreSQL
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_movements_tipo";');
  }
};