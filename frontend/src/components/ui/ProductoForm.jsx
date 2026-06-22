import { useState } from "react";

function ProductoForm({ onCrear }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoriaId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCrear(form);

    setForm({
      nombre: "",
      precio: "",
      stock: "",
      categoriaId: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) =>
          setForm({ ...form, nombre: e.target.value })
        }
      />

      <input
        placeholder="Precio"
        value={form.precio}
        onChange={(e) =>
          setForm({ ...form, precio: e.target.value })
        }
      />

      <input
        placeholder="Stock"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: e.target.value })
        }
      />

      <input
        placeholder="Categoria ID"
        value={form.categoriaId}
        onChange={(e) =>
          setForm({ ...form, categoriaId: e.target.value })
        }
      />

      <button>Agregar</button>
    </form>
  );
}

export default ProductoForm;