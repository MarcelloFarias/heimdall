import { FlatList, Text, View, Image } from "react-native";
import theme from "../../../Theme";
import PasswordListItem from "../PasswordListItem/passwordListItem";
const emptyListImage = require("../../../assets/emptyList.png");
import { Password } from "../../interfaces/password";
import { usePasswords } from "../../hooks/usePasswords";
import { useEffect } from "react";

function PasswordsList() {
  const { passwords } = usePasswords();

  return (
    <FlatList
      style={{ flex: 1, flexGrow: 1 }}
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingBottom: 124,
      }}
      data={passwords}
      extraData={passwords}
      renderItem={({ item }: any) => (
        <PasswordListItem password={item} passwords={passwords} />
      )}
      keyExtractor={(item) => item.passwordName}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ width: 200, height: 200 }} source={emptyListImage} />
          <Text style={{ color: theme.secondary }}>
            Você ainda não guardou nenhuma senha
          </Text>
        </View>
      )}
    />
  );
}

export default PasswordsList;
