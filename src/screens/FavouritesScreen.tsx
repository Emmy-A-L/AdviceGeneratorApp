import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getFavourites } from "../storage/CacheService";

export default function FavouritesScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFavourites().then(setData);
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, i) => i.toString()}
      renderItem={({ item }) => (
        <Text style={{ padding: 10 }}>{item}</Text>
      )}
    />
  );
}