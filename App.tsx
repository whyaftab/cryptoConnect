// libraries
import React from 'react';
import { Provider } from 'react-redux';
import RootNavigator from '@navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';

// misc
import { store } from '@store/store';
import { fonts } from '@styles/fonts';

export default function App() {
  // variables
  const [loaded] = useFonts({
    [fonts.family.bodyBold]: require('./src/assets/fonts/Poppins-Bold.ttf'),
    [fonts.family.bodyMedium]: require('./src/assets/fonts/Poppins-Medium.ttf'),
    [fonts.family.bodyRegular]: require('./src/assets/fonts/Poppins-Regular.ttf'),
  });

  // returns
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast />
    </Provider>
  );
}
