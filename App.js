import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkspaceMaintain from "./screens/WorkspaceMaintain";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import MaintainScreen from "./screens/MaintainScreen";
const Stack = createNativeStackNavigator();

function App() {
  const [workspaceList, setWorkspaceList] = React.useState([]);

  return (
    <WorkspaceMaintain.Provider value={{ workspaceList, setWorkspaceList }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MaintainScreen"
            component={MaintainScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WorkspaceMaintain.Provider>
  );
}

export default App;
