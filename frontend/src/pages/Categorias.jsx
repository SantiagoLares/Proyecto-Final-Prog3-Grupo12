import { useEffect, useState } from "react";
import {
  getCategorias,
  crearCategoria,
  eliminarCategoria,
} from "../services/categoriaService";

import CategoriaForm from "../components/ui/CategoriaForm";
import CategoriaList from "../components/ui/CategoriaList";

import { obtenerData } from "../utils/adaptadores";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const cargar = async () => {
    const res = await getCategorias();
    setCategorias(obtenerData(res));
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrear = async (data) => {
    await crearCategoria(data);
    cargar();
  };

  const handleDelete = async (id) => {
    await eliminarCategoria(id);
    cargar();
  };

  return (
    <div>

      <h2>Categorías</h2>

      <CategoriaForm onCrear={handleCrear} />
      <CategoriaList
        categorias={categorias}
        onDelete={handleDelete}
        />
    </div>
  );
}

export default Categorias;