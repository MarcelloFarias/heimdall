import { TextInput, View, Text } from "react-native";
import theme from "../../../Theme";

interface InputProps {
  keyboardType?: any;
  style?: any;
  onChangeText?: any;
  value?: any;
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  rightElement?: any;
}

function Input(props: InputProps) {
  const inputStyle: any = {
    ...props?.style,
    width: "100%",
    padding: props?.style?.padding || 8,
    borderWidth: props?.style?.borderWidth || 1,
    borderRadius: props?.style?.borderRadius || 4,
    borderColor: props?.style?.borderColor || theme.gray[900],
    height: props?.style?.height || 42,
    marginTop: 0,
  };

  return (
    <View
      style={{
        width: props?.style?.width || "90%",
        marginBottom: props?.style?.marginBottom || 20,
        marginTop: props?.style?.marginTop || 0,
      }}
    >
      <Text style={{ marginBottom: 5, color: theme.gray[500] }}>
        {props?.label}
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          style={inputStyle}
          onChangeText={props?.onChangeText}
          value={props?.value}
          keyboardType={props?.keyboardType || "default"}
          placeholder={props?.placeholder}
          secureTextEntry={props?.secureTextEntry}
        />
        {props?.rightElement ? props?.rightElement : null}
      </View>
    </View>
  );
}

export default Input;
