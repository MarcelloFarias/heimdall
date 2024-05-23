import { FlatList, Text } from "react-native";

interface PasswordsListProps {
  passwords: any;
  setPasswords: any;
}

function PasswordsList(props: PasswordsListProps) {
  return (
    <FlatList
      data={props.passwords}
      extraData={props.passwords}
      renderItem={({ item }: any) => <Text>{item.passwordName}</Text>}
    />
  );
}

export default PasswordsList;
