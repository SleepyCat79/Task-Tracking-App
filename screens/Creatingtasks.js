import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScaledSheet, scale } from "react-native-size-matters";
import * as Font from "expo-font";
import WorkspaceMaintain from "./WorkspaceMaintain";
import colors from "../assets/colors/color";
import * as SplashScreen from "expo-splash-screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

async function loadFonts() {
  await Font.loadAsync({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
  });
}

function Creatingtasks({ route, navigation }) {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [workspace, setWorkspace] = React.useState("");
  const {
    workspaceList,
    setWorkspaceList,
    UserId,
    setUserId,
    refreshData,
    setRefreshData,
  } = React.useContext(WorkspaceMaintain);
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

  const handleAddWorkspace = () => {
    if (workspace === "") {
      return;
    }
    const newWorkspace = {
      title: workspace,
    };

    fetch(`http://10.0.2.2:8000/workspace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workspace,
        userID: UserId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setWorkspaceList([...workspaceList, newWorkspace]);
        setWorkspace("");
        setRefreshData(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Inter-Bold",
          fontSize: scale(24),
        }}
      >
        Create new workspace
      </Text>
      <View style={styles.input1}>
        <TextInput
          placeholder="Workspace name"
          placeholderTextColor={colors.grey}
          value={workspace}
          onChangeText={(text) => setWorkspace(text)}
          style={{
            marginLeft: scale(10),
            fontFamily: "Inter-Regular",
            fontSize: scale(12),
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="Description"
          placeholderTextColor={colors.grey}
          style={{
            marginLeft: scale(10),
            fontFamily: "Inter-Regular",
            fontSize: scale(12),
          }}
        />
      </View>

      <View style={styles.input3a}>
        <TextInput
          placeholder="Tag"
          placeholderTextColor={colors.grey}
          style={{
            marginLeft: scale(10),
            fontFamily: "Inter-Regular",
            fontSize: scale(12),
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={() => handleAddWorkspace()}
        >
          <Text style={{ color: colors.white }}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = ScaledSheet.create({
  input1: {
    width: wp("85%"),
    height: scale(50),
    borderColor: colors.darkblue,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "18@s",
    justifyContent: "center",
    borderRadius: "16@s",
  },
  input3: {
    width: wp("85%"),
    height: scale(50),
    borderColor: colors.darkblue,
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: "16@s",
  },
  input3a: {
    width: wp("85%"),
    height: scale(50),
    borderColor: colors.darkblue,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "18@s",
    justifyContent: "center",
    borderRadius: "16@s",
  },
  input2: {
    width: wp("85%"),
    height: scale(150),
    borderColor: colors.darkblue,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "10@s",
    justifyContent: "baseline",
    marginTop: "18@s",

    borderRadius: "16@s",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    width: wp("90%"),
    alignSelf: "center",
  },
  dropdown: {
    height: 50,
    borderColor: colors.darkblue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  addbutton: {
    width: wp("90%"),
    backgroundColor: "#000",
    height: scale(40),
    marginTop: scale(250),
    marginRight: scale(5),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#1E4D92",
  },
  timebutton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timepicker1: {
    width: wp("35%"),
    marginLeft: scale(25),
    height: scale(40),
    borderColor: colors.darkblue,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "18@s",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16@s",
  },
  timepicker2: {
    width: wp("35%"),
    marginRight: scale(25),
    height: scale(40),
    borderColor: colors.darkblue,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "18@s",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16@s",
  },
});

export default Creatingtasks;
