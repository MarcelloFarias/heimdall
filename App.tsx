import { useEffect } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "./src/components/Sheets/sheets";

function App() {
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    SheetManager.show("OnBoarding-sheet");
  }, []);

  return (
    <SheetProvider>
      <SafeAreaView style={{ height: height }}></SafeAreaView>
    </SheetProvider>
  );
}

export default App;
