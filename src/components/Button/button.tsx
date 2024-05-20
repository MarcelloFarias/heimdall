import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../../../Theme";

interface ButtonProps {
  text: string;
  onPress: any;
  style?: any;
}

function Button(props: ButtonProps) {
  const buttonStyle = StyleSheet.create({
    ...props?.style,
    width: props?.style?.width || 250,
    display: props?.style?.display || "flex",
    alignItems: props?.style?.alignItems || "center",
    justifyContent: props?.style?.justifyContent || "center",
    backgroundColor: props?.style?.backgroundColor || theme.primary,
    height: props?.style?.height || 42,
    borderRadius: props?.style?.borderRadius || 4
  });

  return (
    <TouchableOpacity style={buttonStyle} onPress={props?.onPress}>
      <Text style={{ fontSize: 18, color: theme.light }}>{props?.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
