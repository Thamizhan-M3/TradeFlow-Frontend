// import api from "./axios";

// export async function buyStock(payload) {
//   const response = await api.post("/trades/buy", payload);
//   return response.data;
// }

// export async function sellStock(payload) {
//   const response = await api.post("/trades/sell", payload);
//   return response.data;
// }

// export async function getPortfolioHoldings(userId) {
//   const response = await api.get(`/portfolio/${userId}/holdings`);
//   return response.data;
// }


import { tradesApi } from "./axios";

export const buyStock = async (payload) =>
  (await tradesApi.post("/trades/buy", payload)).data;

export const sellStock = async (payload) =>
  (await tradesApi.post("/trades/sell", payload)).data;