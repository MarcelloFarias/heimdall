import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import theme from "../../../Theme";
import { Feather } from "@expo/vector-icons";
import Button from "../Button/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PasswordListItemProps {
  password: any;
  setPasswords: any;
  passwords: any;
}

function PasswordListItem(props: PasswordListItemProps) {
  const { width } = useWindowDimensions();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  function renderPassword() {
    if (isPasswordVisible) {
      return props?.password?.password;
    }

    let ocultPassword = props?.password?.password.split("");

    for (let i in ocultPassword) {
      ocultPassword[i] = "*";
    }

    return ocultPassword.join("").toString();
  }

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-164, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const deletePassword = () => {
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
              await AsyncStorage.removeItem(props?.password.passwordName);

              props?.setPasswords(
                props?.passwords.filter((password: any) => {
                  return password && password !== props?.password;
                })
              );

              Toast.show({
                type: "success",
                text1: "Senha excluída com sucesso !",
                text2: `${props?.password.passwordName} foi removida da sua lista`,
              });
            },
            style: "destructive",
          },
        ]
      );
    };

    return (
      <Animated.View
        style={[
          {
            width: 164,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 12,
            flexDirection: "row",
          },
          { opacity },
        ]}
      >
        <Pressable
          style={({ pressed }: any) => [
            {
              height: "100%",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.warning,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={() => {}}
        >
          <Feather name="edit" size={24} color={theme.light} />
        </Pressable>

        <Pressable
          style={({ pressed }: any) => [
            {
              height: "100%",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.danger,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={deletePassword}
        >
          <Feather name="trash-2" size={24} color={theme.light} />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={{
          width: width - 22,
          height: Platform.OS === "ios" ? 86 : 100,
          marginTop: 12,
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: theme.secondary,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              color: theme.dark,
              fontSize: 18,
            }}
          >
            {props?.password?.passwordName}
          </Text>
          <Text style={{ color: theme.secondary }}>{renderPassword()}</Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button
            onPress={handlePasswordVisibility}
            style={{ width: 42, backgroundColor: "transparent" }}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={isPasswordVisible ? theme.secondary : theme.dark}
            />
          </Button>

          <Button
            onPress={() => {}}
            style={{ width: 42, backgroundColor: "transparent" }}
          >
            <Feather name="copy" size={24} color={theme.dark} />
          </Button>
        </View>
      </View>
    </Swipeable>
  );
}

export default PasswordListItem;
