import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import { PasswordRegistration } from "../../../interfaces/password";
import Button from "../../Button/button";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Input from "../../Input/input";
import theme from "../../../../Theme";
import { usePasswords } from "../../../hooks/usePasswords";

function UpdatePasswordSheet(props: SheetProps<"UpdatePassword-sheet">) {
  const { setPasswords } = usePasswords();

  const [password, setPassword] = useState<PasswordRegistration>({
    passwordName: props?.payload?.password?.passwordName as string,
    passwordValue: props?.payload?.password?.password as string,
    passwordUser: props?.payload?.password?.passwordUser as string,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function updatePassword() {
    if (password.passwordName && password.passwordValue) {
      try {
        await AsyncStorage.removeItem(
          props?.payload?.password?.passwordName as string
        );

        await AsyncStorage.setItem(
          password.passwordName,
          JSON.stringify({
            passwordName: password.passwordName,
            password: password.passwordValue,
            passwordUser: password.passwordUser,
          })
        );

        setPasswords([]);

        const keys = await AsyncStorage.getAllKeys();

        keys.forEach(async (key: string) => {
          const password = await AsyncStorage.getItem(key);

          if (password !== null && key !== "@configs") {
            setPasswords((prevPasswords: any) => [
              ...prevPasswords,
              JSON.parse(password),
            ]);
          }
        });

        SheetManager.hide("UpdatePassword-sheet");

        return Toast.show({
          type: "success",
          text1: `${password.passwordName} Alterada com sucesso !`,
          text2: "Você pode visualizá-la agora na sua lista",
        });
      } catch (error) {
        console.log(error);
      }
    }
    SheetManager.hide("UpdatePassword-sheet");

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
          <AntDesign name="lock" size={20} color={theme.gray[900]} /> Editar uma
          senha
        </Text>

        <Input
          onChangeText={(passwordName: string) => {
            setPassword({
              ...password,
              passwordName: passwordName,
            });
          }}
          label="Nome da sua senha"
          placeholder="Ex: Senha da Netflix"
          value={password.passwordName}
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
          value={password.passwordValue}
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
          value={password.passwordUser}
          label="Gostaria de alterar um usuário ? (opcional)"
          placeholder="Ex: usuario@email.com"
        />

        <Button
          onPress={() => updatePassword()}
          style={{ marginTop: 20, backgroundColor: theme.green[400] }}
        >
          <Text style={{ fontSize: 16, color: theme.gray[50] }}>Salvar</Text>
        </Button>

        <Button
          style={{ marginTop: 20, backgroundColor: "transparent" }}
          onPress={() => SheetManager.hide("UpdatePassword-sheet")}
        >
          <Text style={{ color: theme.gray[500], fontSize: 16 }}>Cancelar</Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

export default UpdatePasswordSheet;
