import { useState } from "react";
import { Text, View, Pressable } from "react-native";
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

function RegisterPasswordSheet(props: SheetProps<"RegisterPassword-sheet">) {
  const [password, setPassword] = useState<{
    passwordName: string;
    passwordValue: string;
    passwordUser?: string;
  }>({
    passwordName: "",
    passwordValue: "",
    passwordUser: "",
  });

  async function savePassword() {
    if (password.passwordName && password.passwordValue) {
      try {
        await AsyncStorage.setItem(
          password.passwordName,
          JSON.stringify({
            passwordName: password.passwordName,
            password: password.passwordValue,
            userForPassword: password.passwordUser,
          })
        );

        SheetManager.hide("RegisterPassword-sheet");

        const newPassword = await AsyncStorage.getItem(password.passwordName);

        if (newPassword !== null) {
          props?.payload?.setPasswords((prevPasswords: any) => [
            ...prevPasswords,
            JSON.parse(newPassword),
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
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ margin: 26, fontSize: 20, color: theme.dark }}>
          <AntDesign name="lock" size={20} color={theme.dark} /> Guardar uma
          nova senha
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
          text="Salvar"
          onPress={() => savePassword()}
          style={{ marginTop: 20 }}
        />

        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => SheetManager.hide("RegisterPassword-sheet")}
        >
          <Text style={{ color: theme.secondary, fontSize: 16 }}>Cancelar</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}

export default RegisterPasswordSheet;
