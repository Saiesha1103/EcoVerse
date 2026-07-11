import axios, { AxiosInstance } from "axios";
import { World } from "../types/world";

const BASE_URL = "http://localhost:8000";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWorld = async (): Promise<World> => {
  const response = await apiClient.get<World>("/world");
  return response.data;
};