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
  const [UserId, setUserId] = React.useState(null);
  const [Name, setName] = React.useState(null);
  const [Email, setEmail] = React.useState(null);
  const [refreshData, setRefreshData] = React.useState(false);
  const [workspaceId, setWorkspaceId] = React.useState(null);

  return (
    <WorkspaceMaintain.Provider
      value={{
        workspaceList,
        setWorkspaceList,
        UserId,
        setUserId,
        Name,
        setName,
        Email,
        setEmail,
        refreshData,
        setRefreshData,
        workspaceId,
        setWorkspaceId,
      }}
    >
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
