'use strict';

module.exports = {
  // El seeder usa 'up' para inyectar datos falsos o de ejemplo a la base de datos.
  async up(queryInterface, Sequelize) {
    
    // bulkInsert inyecta múltiples registros a la vez en la tabla 'categories'
    // Como las migraciones no generan createdAt automáticamente en los seeders, se lo pasamos con new Date()
    await queryInterface.bulkInsert('categories', [
      { nombre: 'Electrónica', descripcion: 'Dispositivos y gadgets', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Periféricos', descripcion: 'Mouses, teclados, monitores', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Insertamos productos de ejemplo.
    // El 'categoryId' es 1 (Electrónica) o 2 (Periféricos) porque sabemos que se crearon en ese orden arriba.
    await queryInterface.bulkInsert('products', [
      {
        nombre: 'Notebook Lenovo ThinkPad',
        descripcion: 'Laptop para programación',
        sku: 'LEN-THNK-01',
        precio: 1200000.00,
        stock: 10,
        stockMinimo: 2,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Mouse Logitech G203',
        descripcion: 'Mouse gamer',
        sku: 'LOG-G203',
        precio: 30000.00,
        stock: 50,
        stockMinimo: 10,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Insertamos movimientos (entradas de stock).
    // El 'productId' hace referencia al producto 1 (Notebook) o 2 (Mouse).
    await queryInterface.bulkInsert('movements', [
      {
        tipo: 'entrada',
        cantidad: 10,
        motivo: 'Stock inicial',
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'entrada',
        cantidad: 50,
        motivo: 'Compra a proveedor',
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  // La función 'down' limpia los datos que acabamos de meter.
  // Es importante el orden: primero borramos los movimientos, después los productos y al final las categorías.
  // Si tratamos de borrar primero las categorías, la base de datos tiraría error porque hay productos que las están usando.
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movements', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};