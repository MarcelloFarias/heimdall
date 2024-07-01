import { Alert, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import theme from "../../../../Theme";
import Button from "../../Button/button";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePasswords } from "../../../hooks/usePasswords";

function PasswordDetailsSheet(props: SheetProps<"PasswordDetails-sheet">) {
  const { passwords, setPasswords } = usePasswords();

  const deletePassword = async () => {
    Alert.alert(
      "Tem certeza que deseja excluir essa senha ?",
      "A ação não poderá ser desfeita",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await AsyncStorage.removeItem(
              props?.payload?.password?.passwordName as string
            );

            setPasswords(
              passwords.filter((password: any) => {
                return password && password !== props?.payload?.password;
              })
            );

            SheetManager.hide("PasswordDetails-sheet");

            Toast.show({
              type: "success",
              text1: "Senha excluída com sucesso !",
              text2: `${props?.payload?.password?.passwordName} foi removida da sua lista`,
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ActionSheet
      closeOnPressBack={true}
      closeOnTouchBackdrop={true}
      containerStyle={{ height: 400 }}
      headerAlwaysVisible={true}
      gestureEnabled={true}
    >
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 20,
          fontSize: 24,
          color: theme.dark,
        }}
      >
        {props?.payload?.password?.passwordName}
      </Text>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 22,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: theme.dark }}>Senha</Text>
          <Text style={{ color: theme.secondary, fontSize: 18 }}>
            {props?.payload?.password?.password}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 22,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 18,
          }}
        >
          <Text style={{ fontSize: 18, color: theme.dark }}>Usuário</Text>
          <Text style={{ color: theme.secondary, fontSize: 18 }}>
            {props?.payload?.password?.passwordUser
              ? props?.payload?.password?.passwordUser
              : "-"}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          onPress={() => {
            SheetManager.show("UpdatePassword-sheet", {
              payload: {
                password: props?.payload?.password!,
              },
            });
          }}
          style={{ backgroundColor: theme.warning }}
        >
          <Text style={{ color: theme.dark }}>Editar</Text>
        </Button>

        <Button
          onPress={deletePassword}
          style={{ backgroundColor: theme.danger, marginTop: 16 }}
        >
          <Text style={{ color: theme.light }}>Excluir</Text>
        </Button>

        <Button
          onPress={() => SheetManager.hide("PasswordDetails-sheet")}
          style={{ backgroundColor: "transparent", marginTop: 16 }}
        >
          <Text style={{ color: theme.secondary, fontSize: 16 }}>Cancelar</Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

export default PasswordDetailsSheet;
