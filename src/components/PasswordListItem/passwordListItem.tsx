import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import theme from "../../../Theme";
import { Feather } from "@expo/vector-icons";

interface PasswordListItemProps {
  password: any;
  setPasswords: any;
}

function PasswordListItem(props: PasswordListItemProps) {
  const { width } = useWindowDimensions();

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          {
            width: 120,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 12,
            flexDirection: "row",
          },
          { opacity },
        ]}
      >
        <Pressable
          style={{
            height: "100%",
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.warning,
          }}
        >
          <Feather name="edit" size={24} color={theme.light} />
        </Pressable>

        <Pressable
          style={{
            height: "100%",
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.danger,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
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
          height: 64,
          marginTop: 12,
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: theme.secondary,
        }}
      >
        <Text>{props?.password?.passwordName}</Text>
        <Text>{props?.password?.password}</Text>
      </View>
    </Swipeable>
  );
}

export default PasswordListItem;
