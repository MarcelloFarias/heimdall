import { Text, Image, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
const onBoardImage = require("../../../../assets/onBoarding.png");
import Button from "../../Button/button";
import theme from "../../../../Theme";

function OnBoarding() {
  return (
    <ActionSheet
      containerStyle={{ height: 500, padding: 8 }}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}
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
          Boas vindas ao Heimdall !
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5, color: theme.gray[500] }}>
          O melhor lugar para guardar suas senhas.
        </Text>
        <Image
          source={onBoardImage}
          style={{ maxHeight: 300, maxWidth: 300 }}
        />
        <Button
          onPress={() => {
            SheetManager.show("OnBoardingSecurity-sheet");
          }}
          text="Prosseguir"
        />
      </View>
    </ActionSheet>
  );
}

export default OnBoarding;
