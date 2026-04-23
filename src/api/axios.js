// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("tradeflow_token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API call failed:", error.config?.url, error.response?.status, error.message);

//     if (error.response?.status === 401) {
//       localStorage.removeItem("tradeflow_token");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

function createClient(baseURL) {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" }
  });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("tradeflow_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error("API error:", error.config?.url, error.response?.status);

      if (error.response?.status === 401) {
        localStorage.removeItem("tradeflow_token");
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}

// Create service-specific clients
export const usersApi = createClient(import.meta.env.VITE_USERS_API);
export const stocksApi = createClient(import.meta.env.VITE_STOCKS_API);
export const tradesApi = createClient(import.meta.env.VITE_TRADES_API);
export const portfolioApi = createClient(import.meta.env.VITE_PORTFOLIO_API);

// const getEnv = (key) => {
//   return window.__ENV__?.[key];
// };

// export const usersApi = createClient(getEnv("VITE_USERS_API"));
// export const stocksApi = createClient(getEnv("VITE_STOCKS_API"));
// export const tradesApi = createClient(getEnv("VITE_TRADES_API"));
// export const portfolioApi = createClient(getEnv("VITE_PORTFOLIO_API"));