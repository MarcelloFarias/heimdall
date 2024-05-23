import HomeScreen from "./src/screens/Home/home";
import RegisterPasswordScreen from "./src/screens/RegisterPassword/registerPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
