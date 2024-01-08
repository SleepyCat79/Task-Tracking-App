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
    const newTask = { id: (taskList.length + 1).toString(), title: task };
    setTaskList([...taskList, newTask]);
    const updatedWorkspaceList = workspaceList.map((ws) =>
      ws.id === workspaceId ? { ...ws, tasks: [...ws.tasks, newTask] } : ws
    );
    setWorkspaceList(updatedWorkspaceList);
    setTask("");
  };

  const rendertask = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.workspacelist}>
        <Text
          style={{
            color: colors.black,
            fontFamily: "Inter-Bold",
            fontSize: scale(22),
            marginLeft: scale(10),
          }}
        >
          {item.title}
        </Text>
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
    <SafeAreaView>
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
      <View style={{ marginBottom: scale(200) }}>
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
    width: "390@s",
    height: "100@s",
    backgroundColor: "rgba(3, 78, 133, 0.07)",
    marginTop: "16@s",
    marginBottom: "10@s",
  },
});

export default Tasks;
