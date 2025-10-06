import { login, register } from "@/services/authService";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // Token expired
          await AsyncStorage.removeItem("token");
          gotoWelcomePage();
          return;
        }
        setToken(storedToken);
        setUser(decoded.user);
        gotoHomePage();
      } catch (error: any) {
        console.log("Error decoding token", error);
      }
    } else {
      gotoWelcomePage();
    }
  };

  const gotoWelcomePage = () => {
    setTimeout(() => router.replace("/(auth)/welcome"), 1500);
  };

  const gotoHomePage = () => {
    setTimeout(() => router.replace("/(main)/home"), 1500);
  };
  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      //decode token to get user info
      const decoded = jwtDecode<DecodedTokenProps>(token);
      console.log("decoded token", decoded);
      setUser(decoded.user);
    }
  };
  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    setToken(response.token);
    router.replace("/(main)/home");
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null
  ): Promise<void> => {
    await register(email, password, name, avatar);
    router.replace("/(auth)/login");
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/welcome");
  };

  useEffect(() => {
    loadToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signUp, signOut, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
