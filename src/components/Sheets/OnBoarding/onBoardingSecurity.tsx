import { Text, Image, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
const securityImage = require("../../../../assets/security.png");
import Button from "../../Button/button";
import theme from "../../../../Theme";

function OnBoardingSecurity() {
  return (
    <ActionSheet containerStyle={{ height: 500, padding: 8 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "100%",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20, color: theme.dark }}>
          Leve, seguro e prático
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            paddingHorizontal: 5,
            color: theme.secondary,
          }}
        >
          Suas senhas ficam armazenadas localmente, isso significa que elas
          estão guardadas exclusivamente em seu dispositivo e mais nenhum outro
          lugar !
        </Text>
        <Image
          source={securityImage}
          style={{ maxHeight: 200, maxWidth: 200, marginTop: 10 }}
        />
        <Button
          text="Vamos nessa"
          onPress={() => {}}
          style={{ marginTop: 10 }}
        />
      </View>
    </ActionSheet>
  );
}

export default OnBoardingSecurity;
