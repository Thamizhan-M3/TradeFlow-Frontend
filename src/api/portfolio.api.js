import { portfolioApi } from "./axios";

export async function getPortfolioHoldings(userId) {
  const response = await portfolioApi.get(`/portfolio/${userId}/holdings`);
  return response.data;
}