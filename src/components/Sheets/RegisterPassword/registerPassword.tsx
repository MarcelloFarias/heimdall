import { Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import theme from "../../../../Theme";
import Input from "../../Input/input";
import Button from "../../Button/button";
import { AntDesign } from "@expo/vector-icons";

function RegisterPasswordSheet() {
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
          onChangeText={() => {}}
          label="Digite um nome para sua senha"
          placeholder="Ex: Senha da Netflix"
        />

        <Input
          onChangeText={() => {}}
          label="Digite a senha que deseja guardar"
          placeholder="Digite sua senha aqui..."
        />

        <Input
          onChangeText={() => {}}
          label="Gostaria de adicionar um usuário ? (opcional)"
          placeholder="Ex: usuario@email.com"
        />

        <Button text="Salvar" onPress={() => {}} style={{ marginTop: 20 }} />
      </View>
    </ActionSheet>
  );
}

export default RegisterPasswordSheet;
