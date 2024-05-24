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
      style={({ pressed }: any) => [
        {
          ...props?.style,
          position: "absolute",
          bottom: 64,
          right: 36,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      onPress={props?.onPress}
    >
      {props?.children}
    </Pressable>
  );
}

export default FloatButton;
