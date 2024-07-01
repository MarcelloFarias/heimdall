import { FlatList, Text, View, Image } from "react-native";
import theme from "../../../Theme";
import PasswordListItem from "../PasswordListItem/passwordListItem";
const emptyListImage = require("../../../assets/emptyList.png");
import { usePasswords } from "../../hooks/usePasswords";

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
      renderItem={({ item }: any) => <PasswordListItem password={item} />}
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
