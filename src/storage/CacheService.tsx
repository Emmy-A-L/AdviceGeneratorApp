import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "cached_advice";
const FAV_KEY = "favourites";

export const cacheAdvice = async (advice: any) => {
  await AsyncStorage.setItem(CACHE_KEY, advice);
};

export const getCachedAdvice = async () => {
  return await AsyncStorage.getItem(CACHE_KEY);
};

export const saveFavourite = async (advice: any) => {
  const existing = await AsyncStorage.getItem(FAV_KEY);
  const list = existing ? JSON.parse(existing) : [];

  if (!list.includes(advice)) {
    list.push(advice);
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(list));
  }
};

export const getFavourites = async () => {
  const data = await AsyncStorage.getItem(FAV_KEY);
  return data ? JSON.parse(data) : [];
};