import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./Types";
import TimerSetView from "./TimerSetView";
import { TimerCollectionView } from "./TimerCollectionView";
import { TimerProvider } from "./timerContext";
import { SafeAreaView } from "react-native";
import { styles } from "./Shared";

const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <TimerProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TimerCollections"
            screenOptions={{
              headerMode: "screen",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#140B35" },
            }}
          >
            <Stack.Group>
              <Stack.Screen
                name="TimerCollections"
                component={TimerCollectionView}
              />
              <Stack.Screen name="TimerSetView" component={TimerSetView} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </TimerProvider>
  );
}
