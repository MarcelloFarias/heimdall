import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import Button from "../../Button/button";
import theme from "../../../../Theme";
import { useWindowDimensions } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Biometry() {
  const { height } = useWindowDimensions();
  const [biometryType, setBiometryType] = useState("");

  async function getBiometryType() {
    const result =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    result.forEach((biometryType: any) => {
      if (biometryType === 1) {
        setBiometryType("finger-print");
      } else if (biometryType === 2) {
        setBiometryType("facial-recognition");
      } else {
        setBiometryType("");
      }
    });
  }

  useEffect(() => {
    getBiometryType();
  }, []);

  async function acceptBiometry() {
    const localStorageConfigs = await AsyncStorage.getItem("@configs");

    if (localStorageConfigs !== null) {
      const localStorageConfigsObj = JSON.parse(localStorageConfigs);

      await AsyncStorage.setItem(
        "@configs",
        JSON.stringify({
          accessPassword: localStorageConfigsObj?.accessPassword,
          allowBiometry: true,
          firstTimeOnboarding: false,
        })
      );
    }

    SheetManager.hide("OnBoarding-sheet");
    SheetManager.hide("ConfigurePassword-sheet");
    SheetManager.hide("Biometry-sheet");
  }

  const declineBiometry = () => {
    SheetManager.hide("OnBoarding-sheet");
    SheetManager.hide("ConfigurePassword-sheet");
    SheetManager.hide("Biometry-sheet");
  };

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
        <Text
          style={{ fontSize: 28, color: theme.gray[900], marginBottom: 32 }}
        >
          Acesso com biometria
        </Text>
        {biometryType === "finger-print" ? (
          <MaterialCommunityIcons
            name="fingerprint"
            size={100}
            color={theme.gray[400]}
          />
        ) : (
          <MaterialCommunityIcons
            name="face-recognition"
            size={100}
            color={theme.gray[400]}
          />
        )}
        <Text
          style={{
            fontSize: 16,
            marginTop: 32,
            color: theme.gray[500],
            paddingHorizontal: 6,
          }}
        >
          Gostaria de habilitar a biometria para não precisar utilizar sua senha
          ?
        </Text>
        <Button
          onPress={() => acceptBiometry()}
          text="Aceitar"
          style={{ marginTop: 32 }}
        ></Button>

        <Button
          onPress={() => declineBiometry()}
          text="Prosseguir"
          style={{ marginTop: 24, backgroundColor: "transparent" }}
        >
          <Text style={{ color: theme.gray[500], fontSize: 16 }}>
            Deixar para depois
          </Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

export default Biometry;
