import * as React from "react";
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../assets/colors/color";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Padding, Border } from "../assets/globalstyle";
import WorkspaceMaintain from "./WorkspaceMaintain";
import { jwtDecode } from "jwt-decode";
import base64 from "react-native-base64";

//font install
async function loadFonts() {
  await Font.loadAsync({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
  });
}
global.atob = base64.decode;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function SignIn() {
  const { UserId, setUserId, Name, setName } =
    React.useContext(WorkspaceMaintain);
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [visible, setvisible] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    const checkLoginState = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedName = await AsyncStorage.getItem("name");
      console.log("Stored user id:", storedUserId);
      console.log("Stored name:", storedName);
      if (storedUserId) {
        setUserId(storedUserId);
        setName(storedName);
        // Navigate to the main screen
        navigation.navigate("MaintainScreen");
      }
    };

    checkLoginState();
  }, []);

  const handleSignIn = () => {
    if (email === "" || password === "") {
      setErrorMessage("Please fill all the fields");
    } else {
      try {
        fetch("http://10.0.2.2:8000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              if (data.error === "Invalid Email or password") {
                setErrorMessage("Invalid Email or password");
              } else {
                setErrorMessage(data.error);
              }
            } else {
              setName(data.name);
              console.log("User name:", Name);
              const decodedToken = jwtDecode(data.token);
              setUserId(decodedToken.userId);
              console.log(UserId);
              if (isChecked) {
                AsyncStorage.setItem("userId", UserId);
                AsyncStorage.setItem("name", Name);
              }
              navigation.navigate("MaintainScreen");
            }
          });
      } catch (err) {
        console.log(err);
      }

      //
    }
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
    <View>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <View>
        <Text style={styles.text}>Sign In</Text>
        <View style={[styles.input]}>
          <TextInput
            style={[styles.textClr]}
            placeholder="Type your email here"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={[styles.label, styles.orFlexBox]}>
            <Text style={[styles.email, styles.emailTypo]}>Email</Text>
          </View>
        </View>
        <View style={[styles.input1, styles.input1FlexBox]}>
          <TextInput
            style={[styles.password, styles.textLayout]}
            placeholder="Password"
            secureTextEntry={!visible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setvisible(!visible)}>
            <Image
              style={[styles.eyeOffIcon, styles.iconLayout]}
              contentFit="cover"
              source={
                visible
                  ? require("../assets/images/nonhide.png")
                  : require("../assets/images/hide.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.keep, styles.orFlexBox]}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={
                isChecked
                  ? require("../assets/images/squarewithtick.png")
                  : require("../assets/images/square.png")
              }
            />
          </TouchableOpacity>
          <Text style={[styles.keepMeLogged, styles.textClr]}>
            Keep me logged in
          </Text>
        </View>
        <TouchableOpacity onPress={handleSignIn}>
          <View style={[styles.button, styles.input1FlexBox]}>
            <Text style={[styles.signIn2, styles.signIn2Typo]}>Sign in</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.or, styles.orFlexBox]}>
          <Image
            style={[styles.orItemLayout]}
            contentFit="cover"
            source={require("../assets/images/signinwith.png")}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Image
              style={styles.facebook}
              source={require("../assets/images/logofb.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.linked}
              source={require("../assets/images/logolinked.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.google}
              source={require("../assets/images/logogoogle.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.needAnAccountContainer}>
          <Text style={styles.needAnAccount}>{`Need an account? `}</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.createOne}>Create one</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: screenWidth * 0.7, // 70% of the screen's width
    height: screenHeight * 0.3,
    top: screenHeight * 0.05, // 5% of the screen's height
    left: screenWidth * 0.15,
  },
  facebook: {
    width: screenWidth * 0.12, // 10% of the screen's width
    height: screenHeight * 0.06, // 5% of the screen's height
    top: screenHeight * 0.45, // 40% of the screen's height
    left: screenWidth * 0.18, // 20% of the screen's width
  },
  linked: {
    width: screenWidth * 0.12, // 10% of the screen's width
    height: screenHeight * 0.06, // 5% of the screen's height
    top: screenHeight * 0.45, // 40% of the screen's height
    left: screenWidth * 0.3, // 35% of the screen's width
  },
  google: {
    width: screenWidth * 0.12, // 10% of the screen's width
    height: screenHeight * 0.06, // 5% of the screen's height
    top: screenHeight * 0.45, // 40% of the screen's height
    left: screenWidth * 0.42, // 50% of the screen's width
  },
  needAnAccount: {
    fontFamily: "Inter-Regular",
    color: "#6c6c6c",
  },
  createOne: {
    textDecorationLine: "underline",
    fontFamily: "Inter-SemiBold",
    color: colors.Royalblue,
    fontSize: 18,
    position: "absolute",
    top: screenHeight * 0.54,
    left: screenWidth * 0.58,
  },
  needAnAccountContainer: {
    top: screenHeight * 0.54,
    left: screenWidth * -0.08,
    fontSize: 18,
    lineHeight: 27,
    textAlign: "center",
    width: screenWidth * 0.9,
    position: "absolute",
  },
  or: {
    top: screenHeight * 0.4,
    right: screenWidth * 0.06,
    width: 363,
    height: 22,
  },
  orItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  signIn2Typo: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  orFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  signIn2: {
    letterSpacing: -0.2,
    lineHeight: 22,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
  },
  keepMeLogged: {
    marginLeft: 10,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    lineHeight: 24,
    fontSize: 16,
  },
  label: {
    top: -10,
    left: 12,
    paddingHorizontal: 4,
    paddingVertical: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  keep: {
    top: screenHeight * 0.27,
    right: screenWidth * 0.28,
  },
  textClr: {
    color: colors.colorGray,
    textAlign: "left",
  },
  input1FlexBox: {
    justifyContent: "center",
    borderRadius: Border.br_3xs,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  textLayout: {
    lineHeight: screenHeight * 0.027,
    fontSize: 18,
  },
  iconLayout: {
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  eyeOffIcon: {
    marginLeft: 10,
  },
  text: {
    color: colors.textdark,
    fontFamily: "Inter-Bold",
    fontSize: 40,
    position: "absolute",
    left: screenWidth * 0.3,
  },
  password: {
    color: "#232323",
    fontFamily: "Inter-Regular",
    textAlign: "left",
    flex: 2,
    lineHeight: 27,
  },
  login: {
    top: 299,
    right: 7,
    width: 357,
    height: 327,
    position: "absolute",
  },
  signIn: {
    width: "100%",
    height: 844,
    overflow: "hidden",
    flex: 1,
    backgroundColor: colors.background,
  },
  input1: {
    top: screenHeight * 0.167,
    right: screenWidth * 0.05,
    borderColor: "#d9d9d9",
    borderWidth: screenHeight * 0.002,
    width: screenWidth * 0.9,
    padding: Padding.p_base,
    borderStyle: "solid",
  },
  email: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.Royalblue,
    textAlign: "left",
  },
  button: {
    top: screenHeight * 0.32,
    right: screenWidth * 0.05,
    backgroundColor: colors.Royalblue,
    width: screenWidth * 0.9,
    paddingHorizontal: 8,
    paddingVertical: Padding.p_base,
  },
  input: {
    top: screenHeight * 0.08,
    right: screenWidth * 0.05,
    borderColor: colors.Royalblue,
    borderWidth: 1.5,
    width: screenWidth * 0.9,
    borderRadius: Border.br_3xs,
    padding: Padding.p_base,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },

  emailTypo: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  error: {
    color: "red",
    top: screenHeight * 0.49,
    fontSize: 18,
    lineHeight: 27,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Inter-SemiBold",
  },
});
export default SignIn;
