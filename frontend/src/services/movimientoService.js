import API from "./api";

export const crearMovimiento = (data) =>
  API.post("/movimientos", data);

export const getMovimientos = () =>
  API.get("/movimientos");