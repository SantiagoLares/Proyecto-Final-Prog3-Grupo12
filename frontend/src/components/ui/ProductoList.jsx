function ProductoList({ productos, onDelete }) {
  return (
    <ul>
      {productos.map((p) => (
        <li key={p.id}>
          {p.nombre} - ${p.precio} - Stock: {p.stock}

          <button onClick={() => onDelete(p.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;