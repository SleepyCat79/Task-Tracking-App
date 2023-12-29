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

function SignIn() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [visible, setvisible] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

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
    <View style={styles.signin}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <View>
        <Text style={styles.text}>Sign In</Text>
        <View style={[styles.input, styles.inputSpaceBlock]}>
          <TextInput
            style={[styles.tasktrackinghcmuteduvn, styles.textClr]}
            placeholder="Type your email here"
            keyboardType="email-address"
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
        <TouchableOpacity
          onPress={() => {
            //signinfunction
          }}
        >
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
    width: screenWidth * 0.1, // 10% of the screen's width
    height: screenHeight * 0.05, // 5% of the screen's height
    top: screenHeight * 0.4, // 40% of the screen's height
    left: screenWidth * 0.2, // 20% of the screen's width
  },
  linked: {
    width: screenWidth * 0.1, // 10% of the screen's width
    height: screenHeight * 0.05, // 5% of the screen's height
    top: screenHeight * 0.4, // 40% of the screen's height
    left: screenWidth * 0.35, // 35% of the screen's width
  },
  google: {
    width: screenWidth * 0.1, // 10% of the screen's width
    height: screenHeight * 0.05, // 5% of the screen's height
    top: screenHeight * 0.4, // 40% of the screen's height
    left: screenWidth * 0.5, // 50% of the screen's width
  },

  or: {
    top: 289,
    left: -6,
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
    top: 179,
    right: 109,
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
    lineHeight: 27,
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
    top: 104,
    right: 4,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    width: 353,
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
    top: 223,
    right: 8,
    backgroundColor: colors.Royalblue,
    width: 345,
    paddingHorizontal: 8,
    paddingVertical: Padding.p_base,
  },
  input: {
    top: 19,
    right: 0,
    borderColor: colors.Royalblue,
    borderWidth: 1.5,
    width: 356,
    borderRadius: Border.br_3xs,
    padding: Padding.p_base,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  orFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  emailTypo: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  orItemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    flex: 1,
  },
});
export default SignIn;
