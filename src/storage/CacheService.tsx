import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdviceCardProps } from "../components/advice-card";

const CACHE_KEY = "cached_advice";
const FAV_KEY = "favourites";

export const cacheAdvice = async (advice: AdviceCardProps) => {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(advice));
};

export const getCachedAdvice = async () => {
  const data = await AsyncStorage.getItem(CACHE_KEY);
  return data ? JSON.parse(data) : null;
};

// Save full advice object (id + text), avoid duplicates by id
export const saveFavourite = async (advice: AdviceCardProps) => {
  const existing = await AsyncStorage.getItem(FAV_KEY);
  const list: AdviceCardProps[] = existing ? JSON.parse(existing) : [];

  const alreadySaved = list.some((item) => item.id === advice.id);
  if (!alreadySaved) {
    list.unshift(advice); // newest at the top
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(list));
  }
};

// Returns full advice objects
export const getFavourites = async (): Promise<AdviceCardProps[]> => {
  const data = await AsyncStorage.getItem(FAV_KEY);
  return data ? JSON.parse(data) : [];
};

// Remove a single advice by id
export const removeFavourite = async (id: number) => {
  const existing = await AsyncStorage.getItem(FAV_KEY);
  const list: AdviceCardProps[] = existing ? JSON.parse(existing) : [];
  const updated = list.filter((item) => item.id !== id);
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated));
};