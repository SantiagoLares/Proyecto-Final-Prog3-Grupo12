function CategoriaList({ categorias, onDelete }) {
  return (
    <ul>
      {categorias.map((c) => (
        <li key={c.id}>
          {c.nombre}

          <button onClick={() => onDelete(c.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CategoriaList;