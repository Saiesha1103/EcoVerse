import axios, { AxiosInstance } from "axios";
import { World } from "../types/world";

const BASE_URL = "http://localhost:8000";

export interface SimulationState {
  running: boolean;
  tick: number;
  speed: number;
}

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
  terrain: {
    Forest: number;
    Grassland: number;
    River: number;
    Mountain: number;
    Desert: number;
  };
}

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

export const startSimulation = async (): Promise<SimulationState> => {
  const response = await apiClient.post<SimulationState>(
    "/simulation/start",
  );

  return response.data;
};

export const pauseSimulation = async (): Promise<SimulationState> => {
  const response = await apiClient.post<SimulationState>(
    "/simulation/pause",
  );

  return response.data;
};

export const tickSimulation = async (): Promise<World> => {
  const response = await apiClient.post<World>(
    "/simulation/tick",
  );

  return response.data;
};

export const resetSimulation = async (): Promise<SimulationState> => {
  const response = await apiClient.post<SimulationState>(
    "/simulation/reset",
  );

  return response.data;
};

export const getSimulationState =
  async (): Promise<SimulationState> => {
    const response = await apiClient.get<SimulationState>(
      "/simulation/state",
    );

    return response.data;
  };

export const getAnalytics = async (): Promise<Analytics> => {
  const response = await apiClient.get<Analytics>("/analytics/");

  return response.data;
};