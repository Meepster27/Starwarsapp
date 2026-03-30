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

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {Platform.OS === 'ios' ? (
          <Tab.Navigator>
            <Tab.Screen name="Planets" component={Planets} />
            <Tab.Screen name="Spaceships" component={Spaceships} />
            <Tab.Screen name="Films" component={Films} />
          </Tab.Navigator>
        ) : (
          <Drawer.Navigator useLegacyImplementation={false}>
            <Drawer.Screen name="Planets" component={Planets} />
            <Drawer.Screen name="Spaceships" component={Spaceships} />
            <Drawer.Screen name="Films" component={Films} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}