import { Text, Image, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
const onBoardImage = require("../../../../assets/onBoarding.png");
import Button from "../../Button/button";
import theme from "../../../../Theme";
import { useWindowDimensions } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

function OnBoarding() {
  const { height } = useWindowDimensions();

  async function verifyBiometry() {
    await LocalAuthentication.hasHardwareAsync().then(async (response: any) => {
      if (response) {
        if (await LocalAuthentication.isEnrolledAsync()) {
          SheetManager.show("ConfigurePassword-sheet");
          return;
        }

        SheetManager.hide("OnBoarding-sheet");
      }
    });
  }

  return (
    <ActionSheet
      containerStyle={{ height: height, padding: 8 }}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}
    >
      <View
        style={{
          height: height,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Text style={{ fontSize: 28, color: theme.gray[900] }}>
          Boas vindas ao Heimdall !
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5, color: theme.gray[500] }}>
          O melhor lugar para guardar suas senhas.
        </Text>
        <Image
          source={onBoardImage}
          style={{ maxHeight: 200, maxWidth: 200 }}
        />
        <Text
          style={{
            fontSize: 16,
            marginTop: 5,
            color: theme.gray[500],
            paddingHorizontal: 5,
          }}
        >
          Leve, rápido e seguro, suas senhas são armazenadas somente em seu
          dispositivo.
        </Text>
        <Button
          onPress={() => verifyBiometry()}
          text="Prosseguir"
          style={{ marginTop: 24 }}
        ></Button>
      </View>
    </ActionSheet>
  );
}

export default OnBoarding;
