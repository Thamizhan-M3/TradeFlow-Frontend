// import api from "./axios";

// export async function loginUser(payload) {
//   const response = await api.post("/users/login", payload);
//   return response.data;
// }

// export async function registerUser(payload) {
//   const response = await api.post("/users/register", payload);
//   return response.data;
// }

// export async function getUserProfile() {
//   const response = await api.get("/users/profile");
//   return response.data;
// }


import { usersApi } from "./axios";

export const loginUser = async (payload) =>
  (await usersApi.post("/users/login", payload)).data;

export const registerUser = async (payload) =>
  (await usersApi.post("/users/register", payload)).data;

export const getUserProfile = async () =>
  (await usersApi.get("/users/profile")).data;