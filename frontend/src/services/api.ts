import axios, { AxiosInstance } from "axios";
import { World } from "../types/world";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export interface SimulationState {
  running: boolean;
  tick: number;
  speed: number;
}

export type Algorithm = "bfs" | "astar";

export interface Analytics {
  tick: number;
  population: number;
  alive: number;
  dead: number;
  predators: number;
  herbivores: number;
  average_energy: number;
  food_resources: number;
  water_resources: number;
  algorithm: Algorithm;
  terrain: Record<string, number>;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ??
      error.response?.data?.message ??
      error.message ??
      "Backend request failed";

    return Promise.reject(new Error(message));
  },
);

export const getWorld = async (): Promise<World> => {
  const response = await apiClient.get<World>("/world/");
  return response.data;
};

export const startSimulation = async (): Promise<SimulationState> => {
  const response =
    await apiClient.post<SimulationState>("/simulation/start");
  return response.data;
};

export const pauseSimulation = async (): Promise<SimulationState> => {
  const response =
    await apiClient.post<SimulationState>("/simulation/pause");
  return response.data;
};

export const resetSimulation = async (): Promise<SimulationState> => {
  const response =
    await apiClient.post<SimulationState>("/simulation/reset");
  return response.data;
};

export const tickSimulation = async (): Promise<World> => {
  const response = await apiClient.post<World>("/simulation/tick");
  return response.data;
};

export const getSimulationState =
  async (): Promise<SimulationState> => {
    const response =
      await apiClient.get<SimulationState>("/simulation/state");
    return response.data;
  };

export const getAnalytics = async (): Promise<Analytics> => {
  const response = await apiClient.get<Analytics>("/analytics/");
  return response.data;
};

export const changeAlgorithm = async (
  algorithm: Algorithm,
): Promise<{ algorithm: Algorithm; status?: string }> => {
  const response = await apiClient.post<{
    algorithm: Algorithm;
    status?: string;
  }>("/simulation/algorithm", { algorithm });

  return response.data;
};