'use strict';

module.exports = {
  // La función 'up' se ejecuta cuando corremos: npm run migrate
  // Su trabajo es CREAR la tabla en la base de datos y definir sus columnas.
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,        // No permite que este campo esté vacío (NULL)
        autoIncrement: true,     // La base de datos asigna el número automáticamente (1,2,3...)
        primaryKey: true,        // Es la clave principal y única que identifica a este usuario
        type: Sequelize.INTEGER  // El tipo de dato es un número entero
      },
      nombre: {
        type: Sequelize.STRING,  // Cadena de texto estandar
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true             // Garantiza que no se puedan registrar dos usuarios con el mismo email
      },
      password: {
        type: Sequelize.STRING,  // Aca se guarda la contraseña ya hasheada
        allowNull: false
      },
      // createdAt y updatedAt son campos obligatorios de Sequelize para saber cuándo 
      // se creo y cuando se modificó por ultima vez un registro.
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

  // La función 'down' se ejecuta cuando deshacemos la migración
  // Actúa como un botón de panico, borra la tabla completa para volver al estado anterior.
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};