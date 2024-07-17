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
import { Feather } from "@expo/vector-icons";
import { renderLimitChars } from "../../../functions/funcitons";
import PasswordStrength from "../../PasswordStrength/passwordStrength";
import { openConfirmationPasswordSheet } from "../../../functions/funcitons";

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
      containerStyle={{ height: 300 }}
      headerAlwaysVisible={true}
      gestureEnabled={true}
    >
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: theme.gray[900],
          }}
        >
          {renderLimitChars(props?.payload?.password?.passwordName!)}
        </Text>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
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
            style={{ width: 50, backgroundColor: "transparent" }}
          >
            <Feather name="edit" size={24} color={theme.yellow[500]} />
          </Button>

          <Button
            onPress={() => openConfirmationPasswordSheet(deletePassword)}
            style={{
              width: 50,
              marginLeft: 10,
              backgroundColor: "transparent",
            }}
          >
            <Feather name="trash-2" size={24} color={theme.red[400]} />
          </Button>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
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
          <Text style={{ fontSize: 18, color: theme.gray[900] }}>Senha</Text>
          <Text style={{ color: theme.gray[500], fontSize: 18 }}>
            {renderLimitChars(props?.payload?.password?.password!)}
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
          <Text style={{ fontSize: 18, color: theme.gray[900] }}>Usuário</Text>
          <Text style={{ color: theme.gray[500], fontSize: 18 }}>
            {props?.payload?.password?.passwordUser
              ? renderLimitChars(props?.payload?.password?.passwordUser)
              : "-"}
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
          <Text style={{ fontSize: 18, color: theme.gray[900] }}>
            Intensidade
          </Text>
          <PasswordStrength password={props.payload?.password.password!} />
        </View>
      </View>
    </ActionSheet>
  );
}

export default PasswordDetailsSheet;
