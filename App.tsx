import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "./src/components/Sheets/sheets";
import FloatButton from "./src/components/FloatButton/floatButton";
import { AntDesign } from "@expo/vector-icons";
import theme from "./Theme";
import Header from "./src/components/Header/header";
import PasswordsList from "./src/components/PasswordsList/passwordsList";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Password } from "./src/interfaces/password";
import PasswordsProvider from "./src/hooks/usePasswords";

function App() {
  useEffect(() => {
    SheetManager.show("OnBoarding-sheet");
  }, []);

  return (
    <GestureHandlerRootView>
      <PasswordsProvider>
        <SheetProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <PasswordsList />
            <FloatButton
              onPress={() => {
                SheetManager.show("RegisterPassword-sheet");
              }}
            >
              <AntDesign name="pluscircle" size={58} color={theme.primary} />
            </FloatButton>
            <Toast />
          </SafeAreaView>
        </SheetProvider>
      </PasswordsProvider>
    </GestureHandlerRootView>
  );
}

export default App;
