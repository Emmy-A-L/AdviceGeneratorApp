import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FavouritesScreen from "../screens/FavouritesScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any = "help-circle-outline";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Favourites") {
              iconName = "heart";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: "#00A86B",
          tabBarInactiveTintColor: "gray",
          tabBarAllowFontScaling: true,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 10,
            right: 10,
            backgroundColor: "#272727",
            borderColor: "#00A86B",
            borderWidth: .1,
            borderRadius: 16,
            width: "90%",
            marginHorizontal: "auto",
            opacity: 0.9,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            msBackdropFilter: "blur(10px)",
            height: "auto",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}