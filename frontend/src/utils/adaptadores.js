export const obtenerData = (res) => {
  const data = res.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.products)) {
    return data.products;
  }

  if (Array.isArray(data.productos)) {
    return data.productos;
  }

  if (Array.isArray(data.categories)) {
    return data.categories;
  }

  if (Array.isArray(data.categorias)) {
    return data.categorias;
  }

  if (Array.isArray(data.movements)) {
    return data.movements;
  }

  if (Array.isArray(data.movimientos)) {
    return data.movimientos;
  }

  return [];
};