import { View, Text, TouchableOpacity, Platform } from "react-native";
import theme from "../../../Theme";
import { Ionicons } from "@expo/vector-icons";

function Header() {
  return (
    <View
      style={{
        height: Platform.OS === "ios" ? 86 : 112,
        paddingHorizontal: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Text style={{ fontSize: 28, color: theme.dark }}>Minhas Senhas</Text>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="settings-sharp" size={28} color={theme.dark} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
