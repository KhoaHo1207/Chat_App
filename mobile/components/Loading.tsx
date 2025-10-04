import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/constants/themes";

const Loading = ({
  size = "large",
  color = colors.primaryDark,
}: ActivityIndicatorProps) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
