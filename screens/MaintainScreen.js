import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "./Home";
import Workspace from "./Workspace";
import Tasks from "./Tasks";
//Screen names
const homeName = "Home";
const workspaceName = "Workspace";
const taskName = "Tasks";

const Tab = createBottomTabNavigator();

function MaintainScreen() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === workspaceName) {
            iconName = focused ? "mail" : "mail-outline";
          } else if (rn === taskName) {
            iconName = focused ? "albums" : "albums-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name={homeName}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={workspaceName}
        component={Workspace}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={taskName}
        component={Tasks}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MaintainScreen;
