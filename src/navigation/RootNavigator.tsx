import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@hooks/index';
import { useTheme } from '@hooks/index';

import { SignupScreen, LoginScreen, OTPVerificationScreen } from '@screens/auth';
import { HomeScreen, LotteryScreen, WalletScreen, ProfileScreen } from '@screens/main';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  const { colors: palette } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: palette.background }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { colors: palette } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopWidth: 1,
          borderTopColor: palette.border
        },
        tabBarActiveTintColor: palette.orange,
        tabBarInactiveTintColor: palette.textSecondary,
        headerStyle: {
          backgroundColor: palette.surface,
          borderBottomWidth: 1,
          borderBottomColor: palette.border
        },
        headerTintColor: palette.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', headerTitle: 'Dashboard' }} />
      <Tab.Screen name="Lottery" component={LotteryScreen} options={{ tabBarLabel: 'Lottery', headerTitle: 'Almighty Numbers' }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet', headerTitle: 'Wallet' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', headerTitle: 'Profile' }} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const { colors: palette } = useTheme();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: palette.orange,
          background: palette.background,
          card: palette.surface,
          text: palette.text,
          border: palette.border,
          notification: palette.error
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: palette.background }
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={MainNavigator} options={{ animationEnabled: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} options={{ animationEnabled: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
