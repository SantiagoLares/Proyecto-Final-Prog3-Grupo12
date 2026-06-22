import { useState } from "react";
import { crearMovimiento } from "../services/movimientoService";

function Movimientos() {
  const [data, setData] = useState({
    productoId: "",
    cantidad: "",
    tipo: "entrada",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearMovimiento(data);
    alert("Movimiento registrado");
  };

return (
  <div className="page-container">
    <div className="page-header">
      <h2>Movimientos de inventario</h2>

      <div className="nav-actions">
        <a href="/dashboard">Panel</a>
        <a href="/productos">Productos</a>
        <a href="/categorias">Categorías</a>
      </div>
    </div>

    <form className="form-row" onSubmit={handleSubmit}>
      <input
        placeholder="Producto ID"
        onChange={(e) =>
          setData({ ...data, productoId: e.target.value })
        }
      />

      <input
        placeholder="Cantidad"
        onChange={(e) =>
          setData({ ...data, cantidad: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setData({ ...data, tipo: e.target.value })
        }
      >
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </select>

      <button>Registrar</button>
    </form>
  </div>
);}

export default Movimientos;