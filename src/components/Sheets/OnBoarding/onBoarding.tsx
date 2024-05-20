import { View, Text, Image, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
const onBoardImage = require("../../../../assets/onBoarding.png");
import theme from "../../../../Theme";

function OnBoarding() {
  return (
    <ActionSheet containerStyle={{ height: 500, padding: 8 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "100%",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>Boas vindas ao Heimdall !</Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          O melhor lugar para guardar suas senhas.
        </Text>
        <Image
          source={onBoardImage}
          style={{ maxHeight: 300, maxWidth: 300 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: theme.primary,
            padding: 4,
            width: 250,
            borderRadius: 4,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {}}
        >
          <Text style={{ fontSize: 18, color: theme.light }}>Vamos nessa</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

export default OnBoarding;
