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

export const saveFavourite = async (advice: AdviceCardProps) => {
  const existing = await AsyncStorage.getItem(FAV_KEY);
  const list = existing ? JSON.parse(existing) : [];

  if (!list.includes(advice.id)) {
    list.push(advice.id);
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(list));
  }
};

export const getFavourites = async () => {
  const data = await AsyncStorage.getItem(FAV_KEY);
  return data ? JSON.parse(data) : [];
};