import { useState, useEffect, useCallback } from "react";
import { World } from "../types/world";
import { getWorld } from "../services/api";

interface UseWorldResult {
  world: World | null;
  loading: boolean;
  error: string | null;
  reloadWorld: () => Promise<void>;
}

export const useWorld = (): UseWorldResult => {
  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorld = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWorld();
      setWorld(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch world data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorld();
  }, [fetchWorld]);

  const reloadWorld = useCallback(async (): Promise<void> => {
    await fetchWorld();
  }, [fetchWorld]);

  return { world, loading, error, reloadWorld };
};