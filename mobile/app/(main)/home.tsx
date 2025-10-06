import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/themes";
import { useAuth } from "@/contexts/authContext";
import Button from "@/components/Button";

const HomeScreen = () => {
  const { user, signOut } = useAuth();

  const hanldeLogout = async () => {
    await signOut();
  };
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>Home</Typo>

      <Button onPress={hanldeLogout}>
        <Typo>Logout</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
