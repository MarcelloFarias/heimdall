import { Text, Image, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
const securityImage = require("../../../../assets/security.png");
import Button from "../../Button/button";
import theme from "../../../../Theme";

function OnBoardingSecurity() {
  return (
    <ActionSheet
      containerStyle={{ height: 500, padding: 8 }}
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "100%",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20, color: theme.gray[900] }}>
          Leve, seguro e prático
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            paddingHorizontal: 5,
            color: theme.gray[500],
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
          onPress={() => {
            SheetManager.hide("OnBoarding-sheet");
            SheetManager.hide("OnBoardingSecurity-sheet");
          }}
          style={{ marginTop: 10 }}
        />
      </View>
    </ActionSheet>
  );
}

export default OnBoardingSecurity;
