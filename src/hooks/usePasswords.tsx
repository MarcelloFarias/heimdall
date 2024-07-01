import { useState, useEffect, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PasswordsContext = createContext<any>([]);

export const usePasswords = () => useContext(PasswordsContext);

function PasswordsProvider({ children }: any) {
  const [passwords, setPasswords] = useState<any>([]);

  useEffect(() => {}, []);

  return (
    <PasswordsContext.Provider value={{ passwords, setPasswords }}>
      {children}
    </PasswordsContext.Provider>
  );
}

export default PasswordsProvider;
