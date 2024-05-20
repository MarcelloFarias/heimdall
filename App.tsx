import { useEffect } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "./src/components/Sheets/sheets";
import Header from "./src/components/Header/header";

function App() {
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    SheetManager.show("OnBoarding-sheet");
  }, []);

  return (
    <SheetProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
      </SafeAreaView>
    </SheetProvider>
  );
}

export default App;
