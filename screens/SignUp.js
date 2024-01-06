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

import { Padding, Border } from "../assets/globalstyle";
//font install
async function loadFonts() {
  await Font.loadAsync({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
  });
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [passwordagain, setPasswordagain] = React.useState("");
  const navigation = useNavigation();
  const [visible, setvisible] = React.useState(false);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const handleSignup = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordagain === ""
    ) {
      alert("Please fill all the fields");
    } else if (password !== passwordagain) {
      alert("Passwords do not match");
    } else {
      alert("Sign up successful");
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
        <Text style={styles.text}>Sign Up</Text>
        <View style={[styles.input]}>
          <TextInput
            style={[styles.textClr]}
            placeholder="Type your full name here"
            keyboardType="ascii-capable"
            value={name}
            onChangeText={setName}
          />
          <View style={[styles.label, styles.orFlexBox]}>
            <Text style={[styles.email, styles.emailTypo]}>Full Name</Text>
          </View>
        </View>
        <View style={[styles.inputn]}>
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
        <View style={[styles.input1c, styles.input1FlexBox]}>
          <TextInput
            style={[styles.password, styles.textLayout]}
            placeholder="Confirm your password"
            secureTextEntry={!visible}
            value={passwordagain}
            onChangeText={setPasswordagain}
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
        <TouchableOpacity onPress={handleSignup}>
          <View style={[styles.button, styles.input1FlexBox]}>
            <Text style={[styles.signIn2, styles.signIn2Typo]}>Sign up</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={[styles.needAnAccountContainer, styles.needAnAccount]}>
            {`Already have an account? `}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.createOne}>Sign In here</Text>
          </TouchableOpacity>
        </View>
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
  text: {
    color: colors.textdark,
    fontFamily: "Inter-Bold",
    fontSize: 40,
    position: "absolute",
    left: screenWidth * 0.3,
  },
  textClr: {
    color: colors.colorGray,
    textAlign: "left",
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
  emailTypo: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  email: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.Royalblue,
    textAlign: "left",
  },
  orFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
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
  inputn: {
    top: screenHeight * 0.18,
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
  input1: {
    top: screenHeight * 0.27,
    right: screenWidth * 0.05,
    borderColor: "#d9d9d9",
    borderWidth: screenHeight * 0.002,
    width: screenWidth * 0.9,
    padding: Padding.p_base,
    borderStyle: "solid",
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
  password: {
    color: "#232323",
    fontFamily: "Inter-Regular",
    textAlign: "left",
    flex: 2,
    lineHeight: 27,
  },
  input1c: {
    top: screenHeight * 0.36,
    right: screenWidth * 0.05,
    borderColor: "#d9d9d9",
    borderWidth: screenHeight * 0.002,
    width: screenWidth * 0.9,
    padding: Padding.p_base,
    borderStyle: "solid",
  },
  signIn2: {
    letterSpacing: -0.2,
    lineHeight: 22,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
  },
  signIn2Typo: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  button: {
    top: screenHeight * 0.47,
    right: screenWidth * 0.05,
    backgroundColor: colors.Royalblue,
    width: screenWidth * 0.9,
    paddingHorizontal: 8,
    paddingVertical: Padding.p_base,
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
    top: screenHeight * 0.58,
    left: screenWidth * 0.66,
  },
  needAnAccountContainer: {
    top: screenHeight * 0.58,
    left: screenWidth * -0.08,
    fontSize: 18,
    lineHeight: 27,
    textAlign: "center",
    flexDirection: "row",
    width: screenWidth * 0.9,
    position: "absolute",
  },
});
export default SignUp;
