const { Category, Product } = require('../models');

// GET /api/categories - Listar todas las categorías
const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['nombre', 'ASC']] });
    res.json({ categories });
  } catch (error) {
    console.error('Error en getAll categories:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// GET /api/categories/:id - Obtener una categoría por id
const getById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'productos' }]
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ category });
  } catch (error) {
    console.error('Error en getById category:', error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

// POST /api/categories - Crear una categoría
const create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const category = await Category.create({ nombre, descripcion });
    res.status(201).json({ message: 'Categoría creada exitosamente', category });
  } catch (error) {
    console.error('Error en create category:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// PUT /api/categories/:id - Actualizar una categoría
const update = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const { nombre, descripcion } = req.body;
    await category.update({ nombre, descripcion });

    res.json({ message: 'Categoría actualizada exitosamente', category });
  } catch (error) {
    console.error('Error en update category:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// DELETE /api/categories/:id - Eliminar una categoría
const remove = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await category.destroy();
    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error en remove category:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

module.exports = { getAll, getById, create, update, remove };
