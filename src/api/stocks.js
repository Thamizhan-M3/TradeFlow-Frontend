// import api from "./axios";

// export async function getStocks() {
//   const response = await api.get("/stocks");
//   return response.data;
// }

// export async function getStock(symbol) {
//   const response = await api.get(`/stocks/${symbol}`);
//   return response.data;
// }

// export async function getStockHistory(symbol) {
//   const response = await api.get(`/stocks/${symbol}/history`);
//   return response.data;
// }


import { stocksApi } from "./axios";

export const getStocks = async () =>
  (await stocksApi.get("/stocks")).data;

export const getStock = async (symbol) =>
  (await stocksApi.get(`/stocks/${symbol}`)).data;

export const getStockHistory = async (symbol) =>
  (await stocksApi.get(`/stocks/${symbol}/history`)).data;