import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet, scale } from "react-native-size-matters";
import * as Font from "expo-font";
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
let username = "Task Tracking";
let taskdate = "Jan 3, 2024";
function Home({ navigation }) {
  const [data, SetData] = React.useState([1, 1, 1, 1, 1]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
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
    <SafeAreaView>
      <Text style={styles.text}>Good morning, {username}</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const singleItemWidth = wp("50%");
          setCurrentIndex(Math.round(x / singleItemWidth));
        }}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.slidercontain}>
              <TouchableOpacity style={styles.slider}>
                <View style={styles.sliderdate}>
                  <Text style={styles.sliderdatetext}>{taskdate}</Text>
                </View>
                <Text style={styles.slidertext}>Task name here</Text>
                <Text style={styles.slidertext2}>Progress</Text>
                <Progress.Bar
                  progress={0.7}
                  width={scale(160)}
                  height={scale(4)}
                  borderRadius={scale(6)}
                  marginLeft={scale(7)}
                  marginTop={scale(3)}
                  unfilledColor="#000000"
                  borderWidth={0}
                  color="#FFFFFF"
                />
                <Text style={styles.slidertext3}>80%</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 5,
                backgroundColor:
                  currentIndex == index ? colors.darkblue : "gray",
                marginLeft: 5,
              }}
            ></View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
const styles = ScaledSheet.create({
  text: {
    fontSize: "16@s",
    color: colors.black,
    fontFamily: "Inter-Medium",
    textAlign: "center",
    paddingTop: "16@s",
  },
  slider: {
    width: "190@s",
    height: "172@s",
    backgroundColor: colors.darkblue,
    marginLeft: "6@s",
    borderRadius: "10@s",
    marginTop: "10@s",
  },
  slidercontain: {
    width: wp("60%"),
    height: "192@s",
    flex: 1,
  },
  sliderdate: {
    width: "85@s",
    height: "18@s",
    backgroundColor: colors.white,
    borderRadius: "20@s",
    marginTop: "16@s",
    marginLeft: "13@s",
  },
  sliderdatetext: {
    fontSize: "12@s",
    color: colors.darkblue,
    fontFamily: "Inter-Medium",
    textAlign: "center",
    paddingTop: "1@s",
  },
  slidertext: {
    fontSize: "18@s",
    color: colors.white,
    fontFamily: "Inter-Bold",
    paddingLeft: "13@s",
    paddingTop: "13@s",
  },
  slidertext2: {
    fontSize: "12@s",
    color: colors.white,
    fontFamily: "Inter-Bold",
    paddingLeft: "10@s",
    paddingTop: "12@s",
  },
  slidertext3: {
    fontSize: "8@s",
    color: colors.white,
    fontFamily: "Inter-Bold",
    paddingLeft: "170@s",
    paddingTop: "103@s",
    position: "absolute",
  },
});
export default Home;
