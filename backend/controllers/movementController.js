const { Movement, Product, sequelize } = require('../models');

// GET /api/movements - Listar movimientos (filtro opcional por producto)
// Query param: ?productId=1
const getAll = async (req, res) => {
  try {
    const { productId } = req.query;
    const where = {};
    if (productId) {
      where.productId = productId;
    }

    const movements = await Movement.findAll({
      where,
      include: [{ model: Product, as: 'producto' }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ movements });
  } catch (error) {
    console.error('Error en getAll movements:', error);
    res.status(500).json({ error: 'Error al obtener los movimientos' });
  }
};

// POST /api/movements - Registrar un movimiento de inventario y ajustar el stock
// Body: { productId, tipo: 'entrada' | 'salida', cantidad, motivo }
const create = async (req, res) => {
  // Usamos una transacción: o se registra el movimiento Y se actualiza el stock, o no se hace nada.
  const t = await sequelize.transaction();
  try {
    const { productId, tipo, cantidad, motivo } = req.body;

    if (!['entrada', 'salida'].includes(tipo)) {
      await t.rollback();
      return res.status(400).json({ error: "El tipo debe ser 'entrada' o 'salida'" });
    }

    const cant = parseInt(cantidad, 10);
    if (!Number.isInteger(cant) || cant <= 0) {
      await t.rollback();
      return res.status(400).json({ error: 'La cantidad debe ser un entero mayor a 0' });
    }

    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // No permitir que una salida deje el stock en negativo
    if (tipo === 'salida' && product.stock < cant) {
      await t.rollback();
      return res.status(400).json({
        error: `Stock insuficiente. Stock actual: ${product.stock}, salida solicitada: ${cant}`
      });
    }

    // Ajustar el stock segun el tipo de movimiento
    product.stock = tipo === 'entrada' ? product.stock + cant : product.stock - cant;
    await product.save({ transaction: t });

    const movement = await Movement.create(
      { productId, tipo, cantidad: cant, motivo },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: 'Movimiento registrado exitosamente',
      movement,
      stockActual: product.stock
    });
  } catch (error) {
    await t.rollback();
    console.error('Error en create movement:', error);
    res.status(500).json({ error: 'Error al registrar el movimiento' });
  }
};

module.exports = { getAll, create };
