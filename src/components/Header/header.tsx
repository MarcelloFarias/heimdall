import { View } from "react-native";
import theme from "../../../Theme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Header() {
  return (
    <View
      style={{
        height: 64,
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        paddingHorizontal: 14,
      }}
    >
      <TouchableOpacity onPress={() => {}} style={{ alignSelf: "flex-end" }}>
        <Ionicons name="settings-sharp" size={32} color={theme.dark} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
