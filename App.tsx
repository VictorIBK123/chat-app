import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types/navigation";
import Main from "./screens/main";
import ChatWithPerson from "./screens/chatswithperson";
import LoginScreen from "./screens/auth/login";
import SignupScreen from "./screens/auth/signup";
import { View } from "react-native";

export default function App() {
  const  Stack = createStackNavigator<RootStackParamList>()
  return (
    <View style={{flex:1, backgroundColor:'#1a202c'}}>
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="ChatWithPerson" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ChatWithPerson" component={ChatWithPerson} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}