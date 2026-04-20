import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Planets from './screens/Planets';
import Spaceships from './screens/Spaceships';
import Films from './screens/Films';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Planets" component={Planets} />
          <Tab.Screen name="Spaceships" component={Spaceships} />
          <Tab.Screen name="Films" component={Films} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}