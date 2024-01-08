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
import Ionicons from "react-native-vector-icons/Ionicons";

import { ScaledSheet, scale } from "react-native-size-matters";
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

function Tasks({ route, navigation }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isPinned, setIsPinned] = React.useState(false);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const { workspaceId } = route.params;
  const { workspaceList, setWorkspaceList } =
    React.useContext(WorkspaceMaintain);
  const [task, setTask] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);

  React.useEffect(() => {
    const workspace = workspaceList.find((ws) => ws.id === workspaceId);
    if (workspace) {
      setTaskList(workspace.tasks);
    }
  }, [workspaceList, workspaceId]);

  const handleAddTask = () => {
    if (task === "") {
      return;
    }
    const newTask = {
      id: (taskList.length + 1).toString(),
      title: task,
      day: new Date().getDate(),
      month: monthNames[new Date().getMonth()],
    };
    setTaskList([...taskList, newTask]);
    const updatedWorkspaceList = workspaceList.map((ws) =>
      ws.id === workspaceId ? { ...ws, tasks: [...ws.tasks, newTask] } : ws
    );
    setWorkspaceList(updatedWorkspaceList);
    setTask("");
  };

  const rendertask = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "column",
          height: scale(165),
        }}
      >
        <TouchableOpacity style={styles.workspacelist}>
          <Text
            style={{
              color: colors.black,
              fontFamily: "Inter-SemiBold",
              fontSize: scale(18),
              marginLeft: scale(20),
              marginTop: scale(20),
            }}
          >
            {item.title}
          </Text>
          <TouchableOpacity style={styles.username}>
            <Text style={{ color: colors.white, fontFamily: "Inter-SemiBold" }}>
              Username
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.tasktools}>
          <TouchableOpacity>
            <Ionicons
              name="attach"
              size={30}
              color="#000"
              style={{ marginLeft: scale(10) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsPinned(!isPinned)}>
            <Ionicons
              name={isPinned ? "pin" : "pin-outline"}
              color={isPinned ? "red" : "#000"}
              size={30}
              style={{ marginLeft: scale(10) }}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: scale(10),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="time-sharp" size={30} />
            <Text style={{ fontFamily: "Inter-Bold" }}>
              {item.month} {item.day}
            </Text>
          </View>
        </View>
      </View>
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            width: scale(300),
            marginTop: scale(40),
            height: scale(40),
            paddingLeft: scale(10),
          }}
        >
          <TextInput
            style={styles.addworkspace}
            placeholder="Add Task"
            value={task}
            onChangeText={(text) => setTask(text)}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={{
            width: scale(40),
            backgroundColor: "#000",
            height: scale(40),
            marginTop: scale(40),
            marginRight: scale(5),
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleAddTask()}
        >
          <Text style={{ color: colors.white }}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: scale(100) }}>
        <FlatList data={taskList} renderItem={rendertask} />
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
    backgroundColor: "#fff",
    width: "340@s",
    height: "100@s",
    shadowColor: "#000",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.2,
    elevation: 3,
    marginTop: "16@s",
    marginBottom: "10@s",
  },
  username: {
    width: "100@s",
    height: "25@s",
    borderRadius: "5@s",
    backgroundColor: "#008BEF",
    marginTop: "5@s",
    marginLeft: "20@s",
    alignItems: "center",
    justifyContent: "center",
  },
  tasktools: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "340@s",
    height: "40@s",
    shadowColor: "#000",
    alignSelf: "center",
    marginTop: "120@s",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.2,
    elevation: 3,
  },
});

export default Tasks;
