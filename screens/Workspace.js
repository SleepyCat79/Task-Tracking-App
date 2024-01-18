import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet, scale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";

import * as Font from "expo-font";
import WorkspaceMaintain from "./WorkspaceMaintain";

import colors from "../assets/colors/color";
import * as SplashScreen from "expo-splash-screen";
import * as Progress from "react-native-progress";
async function loadFonts() {
  await Font.loadAsync({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
  });
}

function Workspace({ navigation }) {
  const { workspaceList, setWorkspaceList } =
    React.useContext(WorkspaceMaintain);
  const {
    UserId,
    setUserId,
    refreshData,
    setRefreshData,
    workspaceId,
    setWorkspaceId,
  } = React.useContext(WorkspaceMaintain);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("UserId:", UserId); // Log UserId
          const response = await fetch(
            `http://10.0.2.2:8000/workspace?userID=${UserId}`
          );
          console.log("Response status:", response.status); // Log response status
          const data = await response.json();
          console.log("Data:", data); // Log data
          const { workspaces } = data;
          console.log("Workspaces:", workspaces); // Log workspaces
          setWorkspaceList(workspaces);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }, [])
  );
  const renderworkspace = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.workspacelist}
        onPress={() => setWorkspaceId(item._id) & navigation.navigate("Tasks")}
      >
        <Text
          style={{
            color: colors.black,
            fontFamily: "Inter-Bold",
            fontSize: scale(22),
            marginLeft: scale(10),
          }}
        >
          {item.name}
        </Text>
        <View style={styles.taskshow}>
          <Text
            style={{
              color: colors.white,
              textAlign: "center",
              fontSize: scale(13),
              fontStyle: "italic",
              fontFamily: "Inter-Bold",
            }}
          >
            {(item.tasklist ? item.tasklist.length : 0) + " Tasks left "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ marginBottom: scale(100) }}>
        <FlatList data={workspaceList} renderItem={renderworkspace} />
      </View>
    </SafeAreaView>
  );
}
const styles = ScaledSheet.create({
  addworkspace: {
    borderWidth: "2@s",
    borderColor: "#000",
    borderRadius: "6@s",
    paddingVertical: "8@s",
    paddingHorizontal: "16@s",
  },
  workspacelist: {
    width: "390@s",
    height: "100@s",
    backgroundColor: "rgba(3, 78, 133, 0.07)",
    marginTop: "16@s",
    marginBottom: "10@s",
  },
  taskshow: {
    width: "120@s",
    backgroundColor: colors.darkblue,
    borderRadius: "20@s",
    marginTop: "50@s",
    marginLeft: "5@s",
  },
});
export default Workspace;
