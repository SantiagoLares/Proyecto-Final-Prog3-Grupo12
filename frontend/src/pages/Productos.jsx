import { useEffect, useState } from "react";
import {
  getProductos,
  crearProducto,
  eliminarProducto,
} from "../services/productoService";

import ProductoForm from "../components/ui/ProductoForm";
import ProductoList from "../components/ui/ProductoList";

import { obtenerData } from "../utils/adaptadores";

function Productos() {
  const [productos, setProductos] = useState([]);

  const cargar = async () => {
    const res = await getProductos();
    setProductos(obtenerData(res));
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrear = async (data) => {
    await crearProducto(data);
    cargar();
  };

  const handleDelete = async (id) => {
    await eliminarProducto(id);
    cargar();
  };

  return (
    <div>
      <h2>Productos</h2>

      <ProductoForm onCrear={handleCrear} />
      <ProductoList productos={productos} onDelete={handleDelete} />
    </div>
  );
}

export default Productos;