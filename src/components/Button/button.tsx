import { Pressable, Text, StyleSheet } from "react-native";
import theme from "../../../Theme";

interface ButtonProps {
  text: string;
  onPress: any;
  style?: any;
  bg?: string;
}

function Button(props: ButtonProps) {
  const buttonStyle = StyleSheet.create({
    ...props?.style,
    width: props?.style?.width || 250,
    display: props?.style?.display || "flex",
    alignItems: props?.style?.alignItems || "center",
    justifyContent: props?.style?.justifyContent || "center",
    backgroundColor:
      props?.style?.backgroundColor || props?.bg || theme.primary,
    height: props?.style?.height || 42,
    borderRadius: props?.style?.borderRadius || 4,
  });

  return (
    <Pressable style={buttonStyle} onPress={props?.onPress}>
      <Text style={{ fontSize: 18, color: theme.light }}>{props?.text}</Text>
    </Pressable>
  );
}

export default Button;
