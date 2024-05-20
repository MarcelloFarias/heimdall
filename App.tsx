import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "./src/components/Sheets/sheets";
import Header from "./src/components/Header/header";
import RegisterButton from "./src/components/RegisterButton/registerButton";

function App() {
  useEffect(() => {
    SheetManager.show("OnBoarding-sheet");
  }, []);

  return (
    <SheetProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <RegisterButton />
      </SafeAreaView>
    </SheetProvider>
  );
}

export default App;
