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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Progress.Bar
                    progress={0.7}
                    width={scale(160)}
                    height={scale(6)}
                    borderRadius={scale(6)}
                    marginLeft={scale(7)}
                    marginTop={scale(6)}
                    unfilledColor="#000000"
                    borderWidth={0}
                    color="#FFFFFF"
                  />
                  <Text style={styles.slidertext3}>80%</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {/* slider */}

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
      <View style={styles.mainpage}>
        <Text style={styles.pagetext}>You have 100 tasks to be done!</Text>
        <View style={styles.pagetext2}>
          <Text style={styles.subtext}>Finish the landing.</Text>
          <Text style={styles.subtext}>Done the front end.</Text>
          <Text style={styles.subtext}>Get the function ready.</Text>
        </View>
        <Text style={styles.pagetext}>
          97 more tasks are waiting for you...
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.check}>Check tasklist</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button2}>
              <Text style={styles.check2}>Workspace</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    paddingRight: "3@s",
  },
  mainpage: {
    alignSelf: "center",
    width: "320@s",
    height: "320@s",
    backgroundColor: colors.darkblue,
    borderRadius: "40@s",
    marginTop: "20@s",
  },
  pagetext: {
    fontSize: "16@s",
    color: colors.white,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    paddingTop: "16@s",
  },
  pagetext2: {
    alignSelf: "center",
    paddingTop: "16@s",
  },
  subtext: {
    fontSize: "16@s",
    color: colors.white,
    fontFamily: "Inter-Bold",
    paddingBottom: "12@s",
  },
  button: {
    width: "140@s",
    height: "50@s",
    backgroundColor: colors.white,
    marginTop: "30@s",
    marginLeft: "10@s",
    borderRadius: "20@s",
  },
  button2: {
    width: "140@s",
    height: "50@s",
    backgroundColor: colors.darkblue,
    marginTop: "30@s",
    marginRight: "10@s",
    borderRadius: "20@s",
    borderColor: colors.white,
    borderWidth: "2@s",
  },
  check: {
    fontSize: "16@s",
    color: colors.darkblue,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    paddingTop: "13@s",
  },
  check2: {
    fontSize: "16@s",
    color: colors.white,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    paddingTop: "12@s",
  },
});
export default Home;
