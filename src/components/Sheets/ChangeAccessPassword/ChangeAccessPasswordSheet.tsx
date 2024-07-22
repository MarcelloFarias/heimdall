import { Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import Button from "../../Button/button";
import theme from "../../../../Theme";
import { useState } from "react";
import Input from "../../Input/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openConfirmationPasswordSheet } from "../../../functions/funcitons";

function ChangeAccessPassword() {
  const [accessPassword, setAccessPassword] = useState<string>("");
  const [confirmAccessPassword, setConfirmAccessPassword] =
    useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  async function registerAccessPassword() {
    if (accessPassword && confirmAccessPassword) {
      if (accessPassword !== confirmAccessPassword) {
        setMessage("As senhas não conferem");
        return;
      }

      const configs = await AsyncStorage.getItem("@configs");

      if (configs !== null) {
        const configsObj = JSON.parse(configs);

        if (configsObj?.accessPassword !== "") {
          openConfirmationPasswordSheet(async () => {
            await AsyncStorage.setItem(
              "@configs",
              JSON.stringify({
                accessPassword: accessPassword,
                allowBiometry: false,
                firstTimeOnboarding: false,
              })
            );

            setMessage("");
            Toast.show({
              type: "success",
              text1: "Senha de acesso registrada com sucesso !",
              text2: "Use-a para acessar o app e suas senhas",
            });

            SheetManager.hide("ChangeAccessPassword-sheet");
          });

          return;
        }

        await AsyncStorage.setItem(
          "@configs",
          JSON.stringify({
            accessPassword: accessPassword,
            allowBiometry: false,
            firstTimeOnboarding: false,
          })
        );

        setMessage("");
        SheetManager.hide("ChangeAccessPassword-sheet");
        return Toast.show({
          type: "success",
          text1: "Senha de acesso registrada com sucesso !",
          text2: "Use-a para acessar o app e suas senhas",
        });
      }
    }

    setMessage("Preencha todos os campos");
    return;
  }

  return (
    <ActionSheet
      containerStyle={{ height: 500, padding: 8 }}
      closeOnTouchBackdrop={true}
      closeOnPressBack={true}
      closable={true}
      gestureEnabled={true}
      headerAlwaysVisible={true}
    >
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Text style={{ fontSize: 28, color: theme.gray[900] }}>
          Senha de acesso
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 5,
            color: theme.gray[500],
            marginBottom: 32,
            paddingHorizontal: 20,
            textAlign: "left",
          }}
        >
          Alterar ou cadastrar sua senha de acesso
        </Text>
        <Input
          onChangeText={(accessPassword: string) =>
            setAccessPassword(accessPassword)
          }
          label="Crie uma senha de acesso"
          placeholder="Digite sua senha aqui..."
          secureTextEntry={!isPasswordVisible}
          rightElement={
            <Button
              style={{
                width: 42,
                position: "relative",
                right: "100%",
                backgroundColor: "transparent",
              }}
              onPress={handlePasswordVisibility}
            >
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                color={isPasswordVisible ? theme.gray[500] : theme.gray[900]}
                size={22}
              />
            </Button>
          }
        />

        <Input
          onChangeText={(confirmAccessPassword: string) =>
            setConfirmAccessPassword(confirmAccessPassword)
          }
          label="Confirme sua senha de acesso"
          placeholder="Digite sua senha aqui..."
          secureTextEntry={!isConfirmPasswordVisible}
          rightElement={
            <Button
              style={{
                width: 42,
                position: "relative",
                right: "100%",
                backgroundColor: "transparent",
              }}
              onPress={handleConfirmPasswordVisibility}
            >
              <MaterialCommunityIcons
                name={
                  isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"
                }
                color={
                  isConfirmPasswordVisible ? theme.gray[500] : theme.gray[900]
                }
                size={22}
              />
            </Button>
          }
        />

        <Text
          style={{
            fontSize: 14,
            color: theme.red[500],
            marginLeft: 20,
            alignSelf: "flex-start",
          }}
        >
          {message}
        </Text>

        <Button
          onPress={() => registerAccessPassword()}
          text="Salvar"
          style={{ marginTop: 24 }}
        ></Button>

        <Button
          onPress={() => SheetManager.hide("ChangeAccessPassword-sheet")}
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

export default ChangeAccessPassword;
