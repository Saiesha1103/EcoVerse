import { useState, useEffect, useCallback, useRef } from "react";
import { World } from "../types/world";
import {
  startSimulation,
  pauseSimulation,
  tickSimulation,
  resetSimulation,
  getSimulationState,
} from "../services/api";
import type { SimulationState } from "../services/api";

export interface UseSimulationResult {
  world: World | null;
  simulationState: SimulationState;
  loading: boolean;
  error: string | null;
  start: () => Promise<void>;
  pause: () => Promise<void>;
  step: () => Promise<void>;
  reset: () => Promise<void>;
  refreshState: () => Promise<void>;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return "An unexpected simulation error occurred";
}

export function useSimulation(): UseSimulationResult {
  const [world, setWorld] = useState<World | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    running: false,
    tick: 0,
    speed: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refreshState = useCallback(async (): Promise<void> => {
    try {
      const latestState = await getSimulationState();
      if (mountedRef.current) {
        setSimulationState(latestState);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(getErrorMessage(err));
      }
    }
  }, []);

  const start = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await startSimulation();
      const latestState = await getSimulationState();
      if (mountedRef.current) {
        setSimulationState(latestState);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(getErrorMessage(err));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const pause = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await pauseSimulation();
      const latestState = await getSimulationState();
      if (mountedRef.current) {
        setSimulationState(latestState);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(getErrorMessage(err));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const step = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const updatedWorld = await tickSimulation();
      if (mountedRef.current) {
        setWorld(updatedWorld);
      }
      const latestState = await getSimulationState();
      if (mountedRef.current) {
        setSimulationState(latestState);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(getErrorMessage(err));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const reset = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await resetSimulation();
      const latestState = await getSimulationState();
      if (mountedRef.current) {
        setSimulationState(latestState);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(getErrorMessage(err));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
  if (!simulationState.running) return;

  const interval = window.setInterval(() => {
    void step();
  }, 1000);

  return () => window.clearInterval(interval);
}, [simulationState.running, step]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  return {
    world,
    simulationState,
    loading,
    error,
    start,
    pause,
    step,
    reset,
    refreshState,
  };
}