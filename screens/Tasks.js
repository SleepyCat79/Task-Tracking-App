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

function Done({ route, navigation }) {
  <View>
    <Text>Home</Text>
  </View>;
}
function Upcoming({ route, navigation }) {
  <View>
    <Text>Home</Text>
  </View>;
}

function Inprogress({ route, navigation }) {
  const {
    workspaceList,
    setWorkspaceList,
    workspaceId,
    setWorkspaceId,
    UserId,
  } = React.useContext(WorkspaceMaintain);
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

  const [task, setTask] = React.useState("");
  const [addtask, setAddtask] = React.useState(false);
  const [addmember, setAddmember] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [toDoList, setToDoList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [memberEmail, setMemberEmail] = React.useState([]);
  const [taskName, setTaskName] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [subAdd, setSubAdd] = React.useState("");
  const [subtask, setSubtask] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://10.0.2.2:8000/Task?workspaceID=${workspaceId}&userID=${UserId}`
          );
          const data = await response.json();
          setTaskList(data.tasklist);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }, [workspaceId])
  );
  React.useEffect(() => {
    if (selectedTask) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://10.0.2.2:8000/toDoList?userID=${UserId}&taskID=${selectedTask._id}`
          );
          const data = await response.json();
          setTaskList((prevTaskList) =>
            prevTaskList.map((task) =>
              task._id === selectedTask._id
                ? { ...task, toDoList: data.toDoList }
                : task
            )
          );
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, [selectedTask]);
  const rendertask = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "column",
            height: scale(165),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedTask((prevSelectedTask) =>
                prevSelectedTask && prevSelectedTask._id === item._id
                  ? null
                  : item
              );
            }}
            style={styles.workspacelist}
          >
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
            <TouchableOpacity style={styles.username}>
              <Text
                style={{ color: colors.white, fontFamily: "Inter-SemiBold" }}
              >
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
              {/* <Ionicons name="time-sharp" size={30} />
              <Text style={{ fontFamily: "Inter-Bold" }}>
                {item.month} {item.day}
              </Text> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedTask((prevSelectedTask) =>
                  prevSelectedTask && prevSelectedTask._id === item._id
                    ? null
                    : item
                );
                setSubAdd(true);
              }}
            >
              <Ionicons
                name="add"
                size={30}
                style={{ marginLeft: scale(200) }}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        {selectedTask && selectedTask._id === item._id && item.toDoList && (
          <FlatList
            data={item.toDoList}
            renderItem={renderToDo}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  };
  const renderToDo = ({ item, index }) => (
    <View style={styles.todo}>
      <Text
        style={{
          color: colors.white,
          fontFamily: "Inter-SemiBold",
          fontSize: scale(26),
          marginLeft: scale(20),
          justifyContent: "center",
          marginTop: scale(10),
        }}
      >
        {item.name}
      </Text>
    </View>
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
              {selectedTask
                ? `Create Sub Task for ${selectedTask.name}`
                : "ERROR PLEASE TRY AGAIN"}
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
          <View
            style={{
              borderColor: "#2F80ED",
              borderWidth: scale(1),
              width: wp("90%"),
              alignSelf: "center",
              marginTop: scale(10),
              height: scale(80),
            }}
          >
            <TextInput
              placeholder="Enter member's email, seperated by comma..."
              onChangeText={(text) => setMemberEmail(text.split(","))}
              value={memberEmail.join(",")}
              placeholderTextColor={colors.grey}
              multiline={true}
              style={{
                marginLeft: scale(8),
                marginTop: scale(10),
                fontFamily: "Inter-Regular",
                fontSize: scale(14),
                width: wp("100%"),
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.addbutton3}
              onPress={async () => {
                if (!subtask || memberEmail.length === 0 || !selectedTask) {
                  setErrorMessage("Please fill all the fields");
                  return;
                }

                const response = await fetch("http://10.0.2.2:8000/toDoListE", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userEmail: memberEmail,
                    name: subtask,
                    taskID: selectedTask._id,
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
  function memberAdd() {
    return (
      <Modal visible={addmember} animationType="fade" transparent={true}>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            height: hp("100%"),

            width: wp("100%"),
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", right: scale(10) }}
            onPress={() => {
              setAddmember(false);
              setAddtask(true);
            }}
          >
            <Ionicons
              name="close-outline"
              color={"#828282"}
              size={scale(40)}
            ></Ionicons>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Inter-Bold",
              fontSize: scale(18),
              marginTop: scale(30),
              marginLeft: scale(20),
            }}
          >
            Invite people to Workspace
          </Text>

          <View
            style={{
              borderColor: "#2F80ED",
              borderWidth: scale(1),
              width: wp("90%"),
              alignSelf: "center",
              marginTop: scale(40),
              height: scale(180),
            }}
          >
            <TextInput
              placeholder="The person's email you want to invite: name@email.com..."
              placeholderTextColor={colors.grey}
              multiline={true}
              style={{
                marginLeft: scale(10),
                marginTop: scale(10),
                fontFamily: "Inter-Regular",
                fontSize: scale(15),
              }}
            />
          </View>
          <Text
            style={{
              color: "#828282",
              fontFamily: "Inter-Regular",
              fontSize: scale(15),
              alignSelf: "center",
              marginTop: scale(14),
              marginLeft: scale(14),
            }}
          >
            Your teammates will get an email that gives them access to your
            team.
          </Text>
          <View style={{ flexDirection: "row", paddingTop: scale(25) }}>
            <View style={{ flexDirection: "row", paddingTop: scale(10) }}>
              <TouchableOpacity>
                <Ionicons
                  name="link-outline"
                  size={scale(25)}
                  color={colors.Royalblue}
                  style={{ marginLeft: scale(20) }}
                ></Ionicons>
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.Royalblue,
                  fontFamily: "Inter-Regular",
                  fontSize: scale(15),
                  marginLeft: scale(10),
                }}
              >
                copy link invite
              </Text>
            </View>
            <TouchableOpacity style={styles.addbutton2}>
              <Text style={{ color: colors.white, fontFamily: "Inter-Bold" }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  function taskAdd() {
    return (
      <Modal visible={addtask} animationType="slide" transparent={true}>
        <KeyboardAwareScrollView>
          <SafeAreaView
            style={{
              backgroundColor: "#fff",
              height: hp("100%"),
              width: wp("100%"),
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: scale(10) }}
              onPress={() => {
                setMemberEmail([]);
                setAddtask(false);
              }}
            >
              <Ionicons
                name="close-outline"
                color={"#828282"}
                size={scale(40)}
              ></Ionicons>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: scale(20),
                marginTop: scale(30),
                marginLeft: scale(20),
              }}
            >
              Create New Task
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Inter-Regular",
                  fontSize: scale(13),
                  color: "#4F4F4F",
                  marginLeft: scale(20),
                  marginTop: scale(40),
                }}
              >
                {" "}
                For
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  marginLeft: scale(20),
                  marginTop: scale(30),
                  padding: scale(10), // Add padding to give some space around the text
                  backgroundColor: "#fff", // Add a background color for the shadow to show up against
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter-Regular",
                  }}
                >
                  {memberEmail.length === 0
                    ? "Add member"
                    : memberEmail.join(", ")}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.white,
                      padding: 30,
                      width: wp("80%"),
                      height: hp("40%"),
                      borderRadius: 10,
                      borderColor: colors.Royalblue,
                      borderWidth: 1,
                    }}
                  >
                    <TextInput
                      placeholder="Enter member's email, seperated by comma"
                      onChangeText={(text) => setMemberEmail(text.split(","))}
                      value={memberEmail.join(",")}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View
              style={{
                borderColor: "#2F80ED",
                borderWidth: scale(1),
                width: wp("90%"),
                alignSelf: "center",
                marginTop: scale(20),
                height: scale(40),
              }}
            >
              <TextInput
                placeholder="Task name..."
                placeholderTextColor={colors.grey}
                multiline={true}
                onChangeText={(text) => setTaskName(text)}
                style={{
                  marginLeft: scale(8),
                  marginTop: scale(10),
                  fontFamily: "Inter-Regular",
                  fontSize: scale(15),
                }}
                value={taskName}
              />
            </View>
            <View
              style={{
                borderColor: "#2F80ED",
                borderWidth: scale(1),
                width: wp("90%"),
                alignSelf: "center",
                marginTop: scale(20),
                height: scale(140),
              }}
            >
              <TextInput
                placeholder="Description..."
                placeholderTextColor={colors.grey}
                multiline={true}
                onChangeText={(text) => setTaskDescription(text)}
                value={taskDescription}
                style={{
                  marginLeft: scale(8),
                  marginTop: scale(10),
                  fontFamily: "Inter-Regular",
                  fontSize: scale(15),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: scale(25),
                paddingTop: scale(14),
                flex: 1,
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="text-outline"
                  size={scale(25)}
                  color={"#828282"}
                  style={{ marginRight: scale(10) }}
                ></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="happy-outline"
                  size={scale(25)}
                  color={"#828282"}
                  style={{
                    marginRight: scale(5),
                  }}
                ></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="attach-outline"
                  size={scale(25)}
                  color={"#828282"}
                  style={{
                    marginRight: scale(5),
                  }}
                ></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="calendar-outline"
                  size={scale(25)}
                  color={"#828282"}
                  style={{
                    marginRight: scale(5),
                  }}
                ></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAddmember(true);
                  setAddtask(false);
                }}
              >
                <Ionicons
                  name="person-add"
                  size={scale(25)}
                  color={"#828282"}
                  style={{
                    marginLeft: scale(150),
                  }}
                ></Ionicons>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    fontFamily: "Inter-SemiBold",
                    marginLeft: scale(25),
                    fontSize: scale(15),
                    marginBottom: scale(10),
                  }}
                >
                  Start time
                </Text>
                <View
                  style={{
                    borderColor: "#2F80ED",
                    borderWidth: scale(1),
                    width: wp("40%"),
                    height: scale(40),
                    marginLeft: scale(20),
                    marginBottom: scale(140),
                  }}
                >
                  <TextInput
                    input
                    placeholder="YY/MM/DD Hour:Min"
                    placeholderTextColor={colors.grey}
                    multiline={false}
                    onChangeText={(text) => setStartDate(text)}
                    value={startDate}
                    style={{
                      marginLeft: scale(20),
                      marginTop: scale(6),
                      justifyContent: "center",
                      fontFamily: "Inter-Regular",
                      fontSize: scale(11),
                      width: wp("100%"),
                    }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Inter-SemiBold",
                    marginLeft: scale(45),
                    fontSize: scale(15),
                    marginBottom: scale(10),
                  }}
                >
                  End time
                </Text>
                <View
                  style={{
                    borderColor: "#2F80ED",
                    borderWidth: scale(1),
                    width: wp("40%"),
                    height: scale(40),
                    marginLeft: scale(40),
                    marginBottom: scale(140),
                  }}
                >
                  <TextInput
                    input
                    placeholder="YY/MM/DD Hour:Min"
                    placeholderTextColor={colors.grey}
                    multiline={false}
                    onChangeText={(text) => setDeadline(text)}
                    value={deadline}
                    style={{
                      marginLeft: scale(20),
                      marginTop: scale(6),
                      justifyContent: "center",
                      fontFamily: "Inter-Regular",
                      fontSize: scale(11),
                      width: wp("100%"),
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.addbutton}
                onPress={async () => {
                  const response = await fetch("http://10.0.2.2:8000/Task", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      workspaceID: workspaceId,
                      name: taskName,
                      description: taskDescription,
                      startDate: startDate,
                      deadline: deadline,
                      userEmails: memberEmail,
                    }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    console.log("Task created:", data);
                    setModalVisible(false);
                    setMemberEmail([]);
                  } else {
                    console.error("Error creating task:", data.error);
                  }
                }}
              >
                <Text style={{ color: colors.white }}>Add</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <FlatList
        data={taskList}
        renderItem={rendertask}
        keyExtractor={(item, index) => index.toString()}
      />
      {selectedTask && (
        <FlatList
          data={toDoList}
          renderItem={renderToDo}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: scale(30),
          top: scale(20),
        }}
        onPress={() => setAddtask(true)}
      >
        <Ionicons
          name="add-circle"
          size={35}
          color={colors.Royalblue}
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          top: scale(20),
        }}
        onPress={() => setAddmember(true)}
      >
        <Ionicons
          name="ellipsis-horizontal-circle-sharp"
          size={35}
          color={colors.Royalblue}
        ></Ionicons>
      </TouchableOpacity>
      {taskAdd()}
      {memberAdd()}
      {subtaskAdd()}
    </SafeAreaView>
  );
}
const Tab = createMaterialTopTabNavigator();

function Tasks({ route, navigation }) {
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
        <Tab.Screen name="Done" component={Done} />
        <Tab.Screen name="In progress" component={Inprogress} />
        <Tab.Screen name="Upcoming" component={Upcoming} />
      </Tab.Navigator>
      {/* <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons
          name="arrow-back-circle-outline"
          size={40}
          style={{ marginTop: scale(50) }}
        />
      </TouchableOpacity> */}
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

export default Tasks;
