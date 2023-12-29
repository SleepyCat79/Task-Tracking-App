import * as React from "react";
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../assets/colors/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
async function loadFonts() {
  await Font.loadAsync({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
  });
}
import { Padding, Border } from "../assets/globalstyle";

function SignIn() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <View style={styles.signin}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <View style={styles.login}>
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
            secureTextEntry={true}
          />
          <Image
            style={[styles.eyeOffIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/images/hide.png")}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 268,
    height: 249,
    top: 100,
    left: 61,
    flexShrink: 0,
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
    top: 0,
    right: 123,
    fontSize: 40,
    letterSpacing: 0,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  password: {
    color: "#232323",
    fontFamily: "Inter-Regular",
    textAlign: "left",
    flex: 1,
    lineHeight: 27,
  },
  login: {
    top: 349,
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
    top: 154,
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
  input: {
    top: 69,
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
