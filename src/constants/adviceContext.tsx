import React, { createContext, useState, useEffect } from "react";
import { fetchAdvice } from "../api/AdviceApi";
import {
  cacheAdvice,
  getCachedAdvice,
  saveFavourite,
} from "../storage/CacheService";

export const AdviceContext = createContext<any>(null);

export const AdviceProvider = ({ children }: any) => {
  const [advice, setAdvice] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    preload();
  }, []);

  const preload = async () => {
    const cached = await getCachedAdvice();

    if (cached) setAdvice(cached);

    fetchNewAdvice();
  };

  const fetchNewAdvice = async () => {
    try {
      setLoading(true);
      const newAdvice = await fetchAdvice();

      setAdvice(newAdvice);
      await cacheAdvice(newAdvice);

    } catch (e) {
      const cached = await getCachedAdvice();

      if (cached) setAdvice(cached);
      else setAdvice("Offline and no cached data.");
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentAdvice = async () => {
    await saveFavourite(advice);
  };

  return (
    <AdviceContext.Provider
      value={{
        advice,
        loading,
        generateAdvice: fetchNewAdvice,
        saveCurrentAdvice,
      }}
    >
      {children}
    </AdviceContext.Provider>
  );
};