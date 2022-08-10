// libraries
import { useEffect, useMemo } from 'react';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Switch } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// misc
import { useThemeColor } from '@hooks/useThemeColor';
import { useAppSelector } from '@hooks/useReduxHook';
import { NavigationRoutes } from './types';
import { useAuth } from '@hooks/useAuth';

// styles
import { darkTheme, lightTheme } from '@styles/themes';
import { selectTheme } from '@styles/selectors';
import { fonts } from '@styles/fonts';

// screens
import { BinanceConnectScreen } from '@screens/Public/Auth';
import { HomeScreen } from '@screens/Authenticated/Home/HomeScreen';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  // variables
  const themeMode = useAppSelector(selectTheme);
  const { isAuthorized } = useAuth();
  const theme = useMemo(() => (themeMode === 'dark' ? darkTheme : lightTheme), [themeMode]);
  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primaryBackground,
    },
  };
  const { populateTheme, themeToggler } = useThemeColor();

  // hooks
  useEffect(() => {
    populateTheme();
  }, []);

  // returns
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={NavigationTheme}>
          <RootStack.Navigator
            screenOptions={{
              headerTitleStyle: { color: theme.colors.primary, fontFamily: fonts.family.bodyBold },
              headerStyle: { backgroundColor: theme.colors.primaryBackground },
              headerRight: () => (
                <Switch onValueChange={themeToggler} value={themeMode === 'dark'} />
              ),
            }}>
            {isAuthorized ? (
              <RootStack.Screen
                options={{ headerTitle: 'Compte Binance' }}
                component={HomeScreen}
                name={NavigationRoutes.home}
              />
            ) : (
              <RootStack.Screen
                options={{ headerTitle: 'Connecter Binance' }}
                component={BinanceConnectScreen}
                name={NavigationRoutes.auth}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
