import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SheetManager } from "react-native-actions-sheet";
import theme from "../../../Theme";

function RegisterButton() {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 64,
        right: 36,
      }}
      onPress={() => SheetManager.show("RegisterPassword-sheet")}
    >
      <AntDesign name="pluscircle" size={58} color={theme.primary} />
    </TouchableOpacity>
  );
}

export default RegisterButton;
