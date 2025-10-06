import { colors } from "@/constants/themes";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FlashScreen() {
  // const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => router.replace("/(auth)/welcome"), 1500);
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.neutral900}
      />
      <Animated.Image
        source={require("../assets/images/splashImage.png")}
        entering={FadeInDown.duration(700).springify()}
        style={styles.logo}
        resizeMode={"contain"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: 200,
    width: 200,
  },
});
