import { useState } from "react";

function CategoriaForm({ onCrear }) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCrear({ nombre });
    setNombre("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button>Agregar</button>
    </form>
  );
}

export default CategoriaForm;