// libraries
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { layout } from '@styles/layout';

/**
 * get async storage values from key
 */

export const getAsyncStorageValue = async (key: string) => {
  let value: string | null = null;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    value = null;
  }
  return value;
};

/**
 * get screen height in percent
 */

export const getScreenHeightInPercent = (percent: number) => {
  return (layout.screen.height * percent) / 100;
};
