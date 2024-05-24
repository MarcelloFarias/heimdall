import { Pressable } from "react-native";
import { ReactNode } from "react";

interface FloatButtonProps {
  style?: any;
  onPress: any;
  children: ReactNode;
}

function FloatButton(props: FloatButtonProps) {
  return (
    <Pressable
      style={{
        ...props?.style,
        position: "absolute",
        bottom: 64,
        right: 36,
      }}
      onPress={props?.onPress}
    >
      {props?.children}
    </Pressable>
  );
}

export default FloatButton;
