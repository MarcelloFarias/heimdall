import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "./src/components/Sheets/sheets";
import Header from "./src/components/Header/header";
import FloatButton from "./src/components/FloatButton/floatButton";
import { AntDesign } from "@expo/vector-icons";
import theme from "./Theme";

function App() {
  useEffect(() => {
    SheetManager.show("OnBoarding-sheet");
  }, []);

  return (
    <SheetProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <FloatButton
          onPress={() => SheetManager.show("RegisterPassword-sheet")}
        >
          <AntDesign name="pluscircle" size={58} color={theme.primary} />
        </FloatButton>
      </SafeAreaView>
    </SheetProvider>
  );
}

export default App;
