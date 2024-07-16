import { View } from "react-native";
import theme from "../../../Theme";

interface IPasswordStrengthProps {
  password: string;
}

function PasswordStrength(props: IPasswordStrengthProps) {
  const conditions: any[] = [
    props.password.length >= 6 ? 1 : 0,
    props.password.match(/[^a-zA-Z 0-9]+/g) ? 1 : 0,
    props.password.match(/[0-9]/) ? 1 : 0,
    props.password.match(/[A-Z]/) ? 1 : 0,
    props.password.match(/[a-z]/) ? 1 : 0,
  ];

  const conditionsSatisfied = conditions.filter((condition: any) => {
    return condition > 0;
  }).length;

  function measurePassword() {
    if (conditionsSatisfied < 3) {
      return theme.red[100];
    } else if (conditionsSatisfied <= 4) {
      return theme.yellow[200];
    } else {
      return theme.green[300];
    }
  }

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {conditions
        .sort()
        .reverse()
        .map((value: any, index: any) => {
          return (
            <View
              key={index}
              style={{
                height: 10,
                width: 10,
                backgroundColor: value == 0 ? "transparent" : measurePassword(),
                borderWidth: 1,
                borderColor: measurePassword(),
                marginLeft: 5,
                borderRadius: 50,
              }}
            ></View>
          );
        })}
    </View>
  );
}

export default PasswordStrength;
