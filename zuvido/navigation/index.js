import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import ClientScreen from "../screens/Client";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menu Acessível" }} />
      <Stack.Screen name="Client" component={ClientScreen} options={{ title: "Cliente" }} />
    </Stack.Navigator>
  );
}
