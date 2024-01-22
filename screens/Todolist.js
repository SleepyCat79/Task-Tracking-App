import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontiso from "react-native-vector-icons/Fontisto";
import { useFocusEffect } from "@react-navigation/native";
import { ScaledSheet, scale } from "react-native-size-matters";
import * as Font from "expo-font";
import WorkspaceMaintain from "./WorkspaceMaintain";
import colors from "../assets/colors/color";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

function Todolist({ navigation }) {
  const {
    UserId,
    setUserId,
    refreshData,
    setRefreshData,
    workspaceId,
    setWorkspaceId,
  } = React.useContext(WorkspaceMaintain);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [toDoList, setToDoList] = React.useState([]);
  const [subAdd, setSubAdd] = React.useState("");
  const [subtask, setSubtask] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const fetchTasks = React.useCallback(() => {
    const fetchData = async () => {
      try {
        console.log("UserId:", UserId); // Log UserId
        const response = await fetch(
          `http://10.0.2.2:8000/toDoList?userID=${UserId}`
        );
        console.log("Response status:", response.status); // Log response status
        const data = await response.json();
        console.log("Data:", data); // Log data
        const { toDoList } = data;
        console.log("ToDoList:", toDoList); // Log toDoList
        setToDoList(toDoList); // Update the toDoList state
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [UserId]); // add UserId as a dependency

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );
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

  const toDo = ({ item, index }) => {
    return (
      <View>
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
              {item.name}
            </Text>
            <TouchableOpacity
              style={{
                width: scale(150),
                height: scale(25),
                borderRadius: scale(5),
                backgroundColor: "green",
                marginTop: scale(5),
                marginLeft: scale(5),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: colors.white, fontFamily: "Inter-SemiBold" }}
              >
                NOTHING
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.tasktools}>
            <View
              style={{
                marginLeft: scale(10),
                flexDirection: "row",
                alignItems: "center",
              }}
            ></View>
            <TouchableOpacity
              onPress={async () => {
                const response = await fetch(
                  `http://10.0.2.2:8000/toDoList?userID=${UserId}&todoID=${item._id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const data = await response.json();
                if (data.status === "success") {
                  fetchTasks();
                }
              }}
            >
              <Ionicons
                name="trash-outline"
                size={30}
                style={{ marginLeft: scale(300) }}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  function subtaskAdd() {
    return (
      <Modal visible={subAdd} animationType="slide" transparent={true}>
        <View
          style={{
            backgroundColor: colors.white,
            height: hp("50%"),
            alignSelf: "center",
            width: wp("100%"),
            alignItems: "center",
            marginTop: scale(100),
            flexDirection: "column ",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: scale(10),
              alignItems: "center",
              justifyContent: "center",
              width: scale(60),
              height: scale(60),
            }}
            onPress={() => {
              setSubAdd(false);
              setSubtask("");
              setMemberEmail([]);
              setErrorMessage("");
            }}
          >
            <Ionicons
              name="close-outline"
              color={"#828282"}
              size={scale(40)}
            ></Ionicons>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                marginTop: scale(40),
                fontSize: scale(18),
                marginLeft: scale(30),
                width: wp("100%"),
              }}
            >
              New To Do List
            </Text>
          </View>
          <View
            style={{
              borderColor: "#2F80ED",
              borderWidth: scale(1),
              width: wp("90%"),
              alignSelf: "center",
              marginTop: scale(30),
              height: scale(40),
            }}
          >
            <TextInput
              placeholder="Subtask name..."
              placeholderTextColor={colors.grey}
              multiline={true}
              onChangeText={(text) => setSubtask(text)}
              style={{
                marginLeft: scale(8),
                marginTop: scale(10),
                fontFamily: "Inter-Regular",
                fontSize: scale(15),
              }}
              value={subtask}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.addbutton3}
              onPress={async () => {
                if (!subtask) {
                  setErrorMessage("Please fill all the fields");
                  return;
                }

                const response = await fetch("http://10.0.2.2:8000/toDoList", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userID: UserId,
                    name: subtask,
                  }),
                });

                const data = await response.json();

                if (response.ok) {
                  console.log("Sub Task created:", data);
                  setSubAdd(false);
                  setMemberEmail([]);
                  setErrorMessage("");
                } else {
                  setErrorMessage("This user does not exist");
                }
              }}
            >
              <Text style={{ color: colors.white }}>Add</Text>
            </TouchableOpacity>
          </View>
          {errorMessage ? (
            <Text
              style={{
                fontFamily: "Inter-SemiBold",
                top: scale(40),
                fontSize: scale(13),
                color: "red",
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
        </View>
      </Modal>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <FlatList
        data={toDoList}
        renderItem={toDo}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: scale(10),
          top: scale(40),
        }}
        onPress={() => setSubAdd(true)}
      >
        <Ionicons
          name="add-circle"
          size={35}
          color={colors.Royalblue}
        ></Ionicons>
      </TouchableOpacity>
      {subtaskAdd()}
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
    width: "150@s",
    height: "25@s",
    borderRadius: "5@s",
    backgroundColor: "#008BEF",
    marginTop: "5@s",
    marginLeft: "15@s",
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
  addbutton: {
    width: wp("90%"),
    backgroundColor: "#000",
    height: scale(60),
    bottom: scale(70),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#1E4D92",
  },
  addbutton2: {
    width: scale(120),
    backgroundColor: "#000",
    height: scale(40),
    left: scale(60),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colors.Royalblue,
    borderRadius: scale(10),
  },
  addbutton3: {
    width: scale(120),
    backgroundColor: "#000",
    height: scale(40),
    top: scale(30),
    left: scale(60),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colors.Royalblue,
    borderRadius: scale(10),
  },
  addbutton4: {
    width: scale(120),
    backgroundColor: "#000",
    height: scale(40),
    left: scale(60),
    top: scale(100),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colors.Royalblue,
    borderRadius: scale(10),
  },
  todo: {
    backgroundColor: colors.Royalblue,
    width: "320@s",
    borderRadius: "10@s",
    height: "76@s",
    alignSelf: "center",
    marginTop: "20@s",
    flex: 1,
    flexDirection: "column",
  },
});

export default Todolist;
