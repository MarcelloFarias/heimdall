import { useState } from "react";
import { Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import theme from "../../../../Theme";
import Input from "../../Input/input";
import Button from "../../Button/button";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PasswordRegistration } from "../../../interfaces/password";
import { usePasswords } from "../../../hooks/usePasswords";
import { openConfirmationPasswordSheet } from "../../../functions/funcitons";

function RegisterPasswordSheet() {
  const { setPasswords } = usePasswords();
  const [password, setPassword] = useState<PasswordRegistration>({
    passwordName: "",
    passwordValue: "",
    passwordUser: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function savePassword() {
    if (password.passwordName && password.passwordValue) {
      try {
        await AsyncStorage.setItem(
          password.passwordName,
          JSON.stringify({
            passwordName: password.passwordName,
            password: password.passwordValue,
            passwordUser: password.passwordUser,
          })
        );

        SheetManager.hide("RegisterPassword-sheet");

        const newPassword = await AsyncStorage.getItem(password.passwordName);

        if (newPassword !== null) {
          setPasswords((prevPasswords: any) => [
            JSON.parse(newPassword),
            ...prevPasswords,
          ]);
        }

        Toast.show({
          type: "success",
          text1: `${password.passwordName} registrada com sucesso !`,
          text2: "Você pode visualizá-la agora na sua lista",
        });

        return;
      } catch (error) {
        console.log(error);
      }
    }

    SheetManager.hide("RegisterPassword-sheet");

    return Toast.show({
      type: "error",
      text1: "Não foi possível registrar a senha",
      text2: "Por favor, preencha os campos obrigatórios",
    });
  }

  return (
    <ActionSheet
      closeOnPressBack={true}
      closeOnTouchBackdrop={true}
      containerStyle={{ height: 500 }}
      headerAlwaysVisible={true}
      gestureEnabled={true}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ margin: 26, fontSize: 20, color: theme.gray[900] }}>
          <AntDesign name="lock" size={20} color={theme.gray[900]} /> Guardar
          uma nova senha
        </Text>

        <Input
          onChangeText={(passwordName: string) => {
            setPassword({
              ...password,
              passwordName: passwordName,
            });
          }}
          label="Digite um nome para sua senha"
          placeholder="Ex: Senha da Netflix"
        />

        <Input
          onChangeText={(passwordValue: string) => {
            setPassword({
              ...password,
              passwordValue: passwordValue,
            });
          }}
          label="Digite a senha que deseja guardar"
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
          onChangeText={(passwordUser: string) => {
            setPassword({
              ...password,
              passwordUser: passwordUser,
            });
          }}
          label="Gostaria de adicionar um usuário ? (opcional)"
          placeholder="Ex: usuario@email.com"
        />

        <Button
          onPress={() => openConfirmationPasswordSheet(savePassword)}
          style={{ marginTop: 20, backgroundColor: theme.green[400] }}
        >
          <Text style={{ fontSize: 16, color: theme.gray[50] }}>Salvar</Text>
        </Button>

        <Button
          style={{ marginTop: 20, backgroundColor: "transparent" }}
          onPress={() => SheetManager.hide("RegisterPassword-sheet")}
        >
          <Text style={{ color: theme.gray[500], fontSize: 16 }}>Cancelar</Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

export default RegisterPasswordSheet;
