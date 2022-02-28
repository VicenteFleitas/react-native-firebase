import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import UsersList from "./screens/UsersList";
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserList"
        component={UsersList}
        options={{ title: "Users list" }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ title: "Create a new user" }}
      />
      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={{ title: "User detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  console.log(process.env.API_KEY);
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
