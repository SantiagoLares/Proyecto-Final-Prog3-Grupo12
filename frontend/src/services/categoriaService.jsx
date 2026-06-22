import API from "./api";

export const getCategorias = () => API.get("/categorias");

export const crearCategoria = (data) =>
  API.post("/categorias", data);

export const eliminarCategoria = (id) =>
  API.delete(`/categorias/${id}`);

export const editarCategoria = (id, data) =>
  API.put(`/categorias/${id}`, data);