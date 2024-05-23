import { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import theme from "../../../Theme";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

function RegisterPasswordScreen({ navigation, route }: any) {
  const { setPasswords } = route.params;

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

        Toast.show({
          type: "success",
          text1: `${password.passwordName} registrada com sucesso !`,
          text2: "Você pode visualizá-la agora na sua lista",
        });

        const newPassword = await AsyncStorage.getItem(password.passwordName);

        if (newPassword !== null) {
          setPasswords((prevPasswords: any) => [
            ...prevPasswords,
            JSON.parse(newPassword),
          ]);
        }

        return;
      } catch (error) {
        console.log(error);
      }
    }

    return Toast.show({
      type: "error",
      text1: "Não foi possível registrar a senha",
      text2: "Por favor, preencha os campos obrigatórios",
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => {
            savePassword();
          }}
          style={{ marginTop: 20 }}
        />

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: theme.secondary, fontSize: 18 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

export default RegisterPasswordScreen;
