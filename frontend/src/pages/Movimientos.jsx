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
    <form onSubmit={handleSubmit}>
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
  );
}

export default Movimientos;