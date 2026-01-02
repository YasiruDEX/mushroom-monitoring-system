import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider, useThemeMode } from './src/context/ThemeContext';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { MLModelScreen } from './src/screens/MLModelScreen';
import { RobotArmScreen } from './src/screens/RobotArmScreen';
import { SensorControlsScreen } from './src/screens/SensorControlsScreen';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const NavigationContent = () => {
  const theme = useTheme();
  const { mode } = useThemeMode();

  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Drawer.Navigator 
        initialRouteName="Dashboard"

        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.onBackground,
          drawerStyle: {
            backgroundColor: theme.colors.background,
          },
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: theme.colors.onBackground,
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="ML Model" component={MLModelScreen} />
        <Drawer.Screen name="Robot Arm" component={RobotArmScreen} />
        <Drawer.Screen name="Sensors" component={SensorControlsScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <NavigationContent />
      </NavigationContainer>
    </ThemeProvider>
  );
}
