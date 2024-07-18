import AsyncStorage from "@react-native-async-storage/async-storage";
import { SheetManager } from "react-native-actions-sheet";
import * as LocalAuthentication from "expo-local-authentication";
import Toast from "react-native-toast-message";

export function renderLimitChars(text: string) {
  if (text.length < 20) {
    return text;
  }

  return text.substring(0, 20) + "...";
}

export async function openConfirmationPasswordSheet(onConfirm: () => void) {
  const configs = await AsyncStorage.getItem("@configs");

  if (configs !== null) {
    const configsObj = JSON.parse(configs);

    if (configsObj?.allowBiometry) {
      const authenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Utilize a biometria para realizar esta ação",
      });

      if (authenticated.success) {
        onConfirm();
        return;
      }

      if (!authenticated.success) {
        if (configsObj?.accessPassword !== "") {
          Toast.show({
            type: "error",
            text1: "Falha ao realizar leitura biométrica",
            text2: "Tente utilizar sua senha de acesso",
          });

          SheetManager.show("ConfirmPassword-sheet", {
            payload: {
              onConfirm: () => onConfirm(),
            },
          });

          return;
        }

        Toast.show({
          type: "error",
          text1: "Falha ao realizar leitura biométrica",
          text2: "Por favor, tente novamente",
        });

        return;
      }
    }

    if (!configsObj?.allowBiometry) {
      if (configsObj?.accessPassword !== "") {
        SheetManager.show("ConfirmPassword-sheet", {
          payload: {
            onConfirm: () => onConfirm(),
          },
        });

        return;
      }
    }

    onConfirm();
  }
}
