const { Op } = require('sequelize');
const { Product, Category } = require('../models');

// GET /api/products - Listar productos (con búsqueda y filtros opcionales)
// Query params: ?search=texto  ?categoryId=1  ?lowStock=true
const getAll = async (req, res) => {
  try {
    const { search, categoryId, lowStock } = req.query;
    const where = {};

    // Búsqueda por nombre o SKU
    if (search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${search}%` } },
        { sku: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Filtro por categoría
    if (categoryId) {
      where.categoryId = categoryId;
    }

    let products = await Product.findAll({
      where,
      include: [{ model: Category, as: 'categoria' }],
      order: [['nombre', 'ASC']]
    });

    // Filtro de stock bajo (stock por debajo o igual al mínimo)
    if (lowStock === 'true') {
      products = products.filter((p) => p.stock <= p.stockMinimo);
    }

    res.json({ products });
  } catch (error) {
    console.error('Error en getAll products:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// GET /api/products/:id - Obtener un producto por id
const getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'categoria' }]
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error en getById product:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// POST /api/products - Crear un producto
const create = async (req, res) => {
  try {
    const { nombre, descripcion, sku, precio, stock, stockMinimo, categoryId } = req.body;

    // Validar que la categoría exista (si se envió)
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'La categoría indicada no existe' });
      }
    }

    const product = await Product.create({
      nombre,
      descripcion,
      sku,
      precio,
      stock,
      stockMinimo,
      categoryId
    });

    res.status(201).json({ message: 'Producto creado exitosamente', product });
  } catch (error) {
    console.error('Error en create product:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Ya existe un producto con ese SKU' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// PUT /api/products/:id - Actualizar un producto
const update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { nombre, descripcion, sku, precio, stock, stockMinimo, categoryId } = req.body;

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'La categoría indicada no existe' });
      }
    }

    await product.update({ nombre, descripcion, sku, precio, stock, stockMinimo, categoryId });

    res.json({ message: 'Producto actualizado exitosamente', product });
  } catch (error) {
    console.error('Error en update product:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Ya existe un producto con ese SKU' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// DELETE /api/products/:id - Eliminar un producto
const remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.destroy();
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error en remove product:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = { getAll, getById, create, update, remove };
