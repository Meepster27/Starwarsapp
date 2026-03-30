import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Planets from './screens/Planets';
import Spaceships from './screens/Spaceships';
import Films from './screens/Films';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Navigator = Platform.OS === 'ios' ? Tab.Navigator : Drawer.Navigator;
const Screen = Platform.OS === 'ios' ? Tab.Screen : Drawer.Screen;

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Planets" component={Planets} />
          <Screen name="Spaceships" component={Spaceships} />
          <Screen name="Films" component={Films} />
        </Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}