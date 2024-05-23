import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "./src/components/Sheets/sheets";
import FloatButton from "./src/components/FloatButton/floatButton";
import { AntDesign } from "@expo/vector-icons";
import theme from "./Theme";
import Header from "./src/components/Header/header";
import PasswordsList from "./src/components/PasswordsList/passwordsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {
  const [passwords, setPasswords] = useState<any[]>([]);

  const getAllPasswords = async () => {
    const keys = await AsyncStorage.getAllKeys();

    try {
      keys.forEach(async (key: string) => {
        const password = await AsyncStorage.getItem(key);

        if (password !== null) {
          setPasswords((prevPasswords: any) => [
            ...prevPasswords,
            JSON.parse(password),
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPasswords();
  }, []);

  useEffect(() => {
    SheetManager.show("OnBoarding-sheet");
  }, []);

  return (
    <GestureHandlerRootView>
      <SheetProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          <PasswordsList passwords={passwords} setPasswords={setPasswords} />
          <FloatButton
            onPress={() => {
              SheetManager.show("RegisterPassword-sheet", {
                payload: { setPasswords: setPasswords },
              });
            }}
          >
            <AntDesign name="pluscircle" size={58} color={theme.primary} />
          </FloatButton>
          <Toast />
        </SafeAreaView>
      </SheetProvider>
    </GestureHandlerRootView>
  );
}

export default App;
