import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import theme from "../../../../Theme";
import Input from "../../Input/input";
import Button from "../../Button/button";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

function RegisterPasswordSheet() {
  const [password, setPassword] = useState<{
    passwordName: string;
    passwordValue: string;
    passwordUser?: string;
  }>({
    passwordName: "",
    passwordValue: "",
    passwordUser: "",
  });

  useEffect(() => {
    console.log(password);
  }, [password]);

  async function savePassword() {
    if (password.passwordName && password.passwordValue) {
      try {
        await AsyncStorage.setItem(
          password.passwordName,
          JSON.stringify({
            password: password.passwordValue,
            userForPassword: password.passwordUser,
          })
        );

        console.log(`${password.passwordName} registrada !`);
      } catch (error) {
        console.log(error);
      }
    }
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

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => SheetManager.hide("RegisterPassword-sheet")}
        >
          <Text style={{ color: theme.danger, fontSize: 18 }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

export default RegisterPasswordSheet;
