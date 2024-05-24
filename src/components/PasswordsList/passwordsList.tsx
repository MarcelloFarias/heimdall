import { FlatList, Text, View, Image } from "react-native";
import theme from "../../../Theme";
import PasswordListItem from "../PasswordListItem/passwordListItem";
const emptyListImage = require("../../../assets/emptyList.png");

interface PasswordsListProps {
  passwords: any;
  setPasswords: any;
}

function PasswordsList(props: PasswordsListProps) {
  return (
    <FlatList
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        width: "100%",
      }}
      data={props.passwords}
      extraData={props.passwords}
      renderItem={({ item }: any) => (
        <PasswordListItem password={item} setPasswords={props.setPasswords} />
      )}
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
