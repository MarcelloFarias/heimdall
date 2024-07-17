import { Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import Button from "../../Button/button";
import theme from "../../../../Theme";
import { useState } from "react";
import Input from "../../Input/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ConfirmPassword(props: SheetProps<"ConfirmPassword-sheet">) {
  const [accessPassword, setAccessPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function confirmPassword() {
    const configs = await AsyncStorage.getItem("@configs");

    if (configs !== null) {
      const configsObj = JSON.parse(configs);

      if (accessPassword) {
        if (accessPassword === configsObj?.accessPassword) {
          props.payload?.onConfirm();

          SheetManager.hide("ConfirmPassword-sheet");
          return;
        }

        setMessage("Senha de acesso incorreta !");
        return;
      }
      setMessage("Digite sua senha de acesso !");
    }
  }

  return (
    <ActionSheet
      containerStyle={{ height: 500, padding: 8 }}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}
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
            marginTop: 24,
            color: theme.gray[500],
            marginBottom: 32,
            paddingHorizontal: 20,
            textAlign: "left",
          }}
        >
          Confirme sua senha de acesso para realizar esta ação
        </Text>
        <Input
          onChangeText={(accessPassword: string) =>
            setAccessPassword(accessPassword)
          }
          label="Digite sua senha de acesso"
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
          onPress={() => confirmPassword()}
          text="Confirmar"
          style={{ marginTop: 16 }}
        ></Button>

        <Button
          onPress={() => SheetManager.hide("ConfirmPassword-sheet")}
          text="Prosseguir"
          style={{ marginTop: 24, backgroundColor: "transparent" }}
        >
          <Text style={{ color: theme.red[500], fontSize: 16 }}>Cancelar</Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

export default ConfirmPassword;
