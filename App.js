import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Planets from './screens/Planets';
import Spaceships from './screens/Spaceships';
import Films from './screens/Films';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#000',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const tabScreenOptions = ({ route }) => ({
  ...screenOptions,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Planets') {
      iconName = 'earth';
    } else if (route.name === 'Spaceships') {
      iconName = 'rocket';
    } else if (route.name === 'Films') {
      iconName = 'film';
    }
    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#ffd700',
  tabBarInactiveTintColor: '#888',
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {Platform.OS === 'ios' ? (
          <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen name="Planets" component={Planets} />
            <Tab.Screen name="Spaceships" component={Spaceships} />
            <Tab.Screen name="Films" component={Films} />
          </Tab.Navigator>
        ) : (
          <Drawer.Navigator screenOptions={screenOptions}>
            <Drawer.Screen name="Planets" component={Planets} />
            <Drawer.Screen name="Spaceships" component={Spaceships} />
            <Drawer.Screen name="Films" component={Films} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}