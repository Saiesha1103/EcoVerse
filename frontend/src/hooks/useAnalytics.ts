import { useCallback, useEffect, useState } from "react";
import {
  getAnalytics,
  type Analytics,
} from "../services/api";

interface UseAnalyticsResult {
  analytics: Analytics | null;
  loading: boolean;
  error: string | null;
  refreshAnalytics: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsResult {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAnalytics = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch analytics",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAnalytics();
  }, [refreshAnalytics]);

  return {
    analytics,
    loading,
    error,
    refreshAnalytics,
  };
}