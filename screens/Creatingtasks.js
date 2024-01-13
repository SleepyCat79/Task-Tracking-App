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
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
  });
}
function WorkspaceCreate() {
  const [workspace, setWorkspace] = React.useState("");
  const { workspaceList, setWorkspaceList } =
    React.useContext(WorkspaceMaintain);
  const handleAddWorkspace = () => {
    if (workspace === "") {
      return;
    }
    setWorkspaceList([
      ...workspaceList,
      {
        id: (workspaceList.length + 1).toString(),
        title: workspace,
        tasks: [],
      },
    ]);
    setWorkspace("");
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
          placeholder="Task name"
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

function TaskCreate() {
  const { workspaceList, setWorkspaceList } =
    React.useContext(WorkspaceMaintain);
  const [task, setTask] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  const [taskDescription, setTaskDescription] = React.useState("");
  const data = workspaceList.map((workspace, index) => ({
    label: workspace.title,
    value: workspace.id,
  }));
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const handleAddTask = () => {
    if (task === "") {
      return;
    }
    const workspace = workspaceList.find((ws) => ws.id === value);
    if (!workspace) {
      console.error("No workspace selected");
      return;
    }
    const newTask = {
      id: (taskList.length + 1).toString(),
      title: task,
    };
    setTaskList([...taskList, newTask]);
    const updatedWorkspaceList = workspaceList.map((ws) =>
      ws.id === workspace.id ? { ...ws, tasks: [...ws.tasks, newTask] } : ws
    );
    setWorkspaceList(updatedWorkspaceList);
    setTask("");
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Choose Workspace
        </Text>
      );
    }
    return null;
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
          fontSize: scale(26),
        }}
      >
        Create new task
      </Text>
      <View style={styles.input1}>
        <TextInput
          placeholder="Task name"
          placeholderTextColor={colors.grey}
          style={{
            marginLeft: scale(10),
            fontFamily: "Inter-Regular",
            fontSize: scale(12),
          }}
          value={task}
          onChangeText={setTask}
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
          value={taskDescription}
          onChangeText={setTaskDescription}
        />
      </View>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select workspace" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="database"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.input3}>
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
      <View style={styles.timebutton}>
        <TouchableOpacity
          style={styles.timepicker1}
          onPress={() => showDatepicker()}
        >
          <Text style={{ fontFamily: "Inter-SemiBold" }}>
            Set deadline Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timepicker2}
          onPress={() => showTimepicker()}
        >
          <Text style={{ fontFamily: "Inter-SemiBold" }}>
            Set deadline Time
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.input1}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Inter-Bold",
            fontSize: scale(14),
          }}
        >
          Deadline: {date.toLocaleString()}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={() => handleAddTask()}
        >
          <Text style={{ color: colors.white }}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();

function Creatingtasks({ route, navigation }) {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

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
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.white,
            height: scale(30),
            width: wp("100%"),
            elevation: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.darkblue, // Change this to your desired color
            height: 2, // Change this to modify the height
          },
          tabBarItemStyle: {
            justifyContent: "center", // Aligns the icon and label vertically
            alignItems: "center", // Aligns the icon and label horizontally
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: "auto",
            fontFamily: "Inter-SemiBold",
          },
        }}
      >
        <Tab.Screen name="Create new workspace" component={WorkspaceCreate} />
        <Tab.Screen name="Create new task" component={TaskCreate} />
      </Tab.Navigator>
      <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons
          name="arrow-back-circle-outline"
          size={40}
          style={{ marginTop: scale(60) }}
        />
      </TouchableOpacity>
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
    marginTop: scale(40),
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
