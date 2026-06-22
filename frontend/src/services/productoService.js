import API from "./api";

export const getProductos = () => API.get("/productos");

export const crearProducto = (data) =>
  API.post("/productos", data);

export const eliminarProducto = (id) =>
  API.delete(`/productos/${id}`);

export const editarProducto = (id, data) =>
  API.put(`/productos/${id}`, data);