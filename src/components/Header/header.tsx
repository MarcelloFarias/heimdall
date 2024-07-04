import { View, Text, Pressable, Platform } from "react-native";
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
      <Text style={{ fontSize: 28, color: theme.gray[900] }}>
        Minhas Senhas
      </Text>
      <Pressable onPress={() => {}}>
        <Ionicons name="settings-sharp" size={28} color={theme.gray[900]} />
      </Pressable>
    </View>
  );
}

export default Header;
