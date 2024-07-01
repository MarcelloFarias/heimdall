import { useState, useEffect, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PasswordsContext = createContext<any>([]);

export const usePasswords = () => useContext(PasswordsContext);

function PasswordsProvider({ children }: any) {
  const [passwords, setPasswords] = useState<any>([]);

  const getAllPasswords = async () => {
    const keys = await AsyncStorage.getAllKeys();

    keys.forEach(async (key: any) => {
      const password = await AsyncStorage.getItem(key);

      if (password !== null) {
        setPasswords((prevPasswords: any) => [
          ...prevPasswords,
          JSON.parse(password),
        ]);
      }
    });
  };

  useEffect(() => {
    getAllPasswords();
  }, []);

  return (
    <PasswordsContext.Provider value={{ passwords, setPasswords }}>
      {children}
    </PasswordsContext.Provider>
  );
}

export default PasswordsProvider;
