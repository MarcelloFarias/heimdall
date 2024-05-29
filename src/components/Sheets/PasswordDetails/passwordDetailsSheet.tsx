import { Text, View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import theme from "../../../../Theme";
import Button from "../../Button/button";

function PasswordDetailsSheet(props: SheetProps<"PasswordDetails-sheet">) {
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
        <Button onPress={() => {}} style={{ backgroundColor: theme.warning }}>
          <Text style={{ color: theme.dark }}>Editar</Text>
        </Button>

        <Button
          onPress={() => {}}
          style={{ backgroundColor: theme.danger, marginTop: 16 }}
        >
          <Text style={{ color: theme.light }}>Excluir</Text>
        </Button>

        <Button
          onPress={() => {}}
          style={{ backgroundColor: "transparent", marginTop: 16 }}
        >
          <Text style={{ color: theme.secondary, fontSize: 16 }}>Cancelar</Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

export default PasswordDetailsSheet;
