// libraries
import { Dimensions } from 'react-native';
import { DefaultTheme } from 'styled-components/native';

const { width, height } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const layout: DefaultTheme['layout'] = {
  window: { width, height },
  screen: { width: screenWidth, height: screenHeight },
  padding: 32,
  buttons: {
    height: 54,
  },
  borderRadius: 16,
  contentPadding: 40,
};
