// misc
import { DefaultTheme } from 'styled-components/native';
import { layout } from './layout';

/**
 * to add transparency to an hexa color, see this
 * https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
 */

export const darkTheme: DefaultTheme = {
  colors: {
    // main
    primary: '#FFFFFF',
    get primary50() {
      return this.primary + 80;
    },
    get primary25() {
      return this.primary + 40;
    },
    secondary: '#ffc689',
    primaryBackground: '#141516',
    get primaryBackground50() {
      return this.primaryBackground + 80;
    },
    primaryReverse: '#141516',
    red: '#F77373',
    white: '#FFFFFF',
    silver: '#333333',
    transparent: 'transparent',

    // other
    buttonBackground: '#252626',
    inputBg: '#141516',
    inputErrorBg: '#f7737340',
    dividerBorder: '#2b2b2b',
    text: '#333333',
    get text50() {
      return this.text + 80;
    },
  },
  layout: { ...layout },
};

export const lightTheme: DefaultTheme = {
  colors: {
    // main
    primary: '#0B0C10',
    get primary50() {
      return this.primary + 80;
    },
    get primary25() {
      return this.primary + 40;
    },
    secondary: '#ffc689',
    primaryBackground: '#FFFFFF',
    get primaryBackground50() {
      return this.primaryBackground + 80;
    },
    primaryReverse: '#141516',
    red: '#F77373',
    white: '#FFFFFF',
    silver: '#333333',
    transparent: 'transparent',

    // other
    buttonBackground: '#141516',
    inputBg: '#FFFFFF',
    inputErrorBg: '#f7737340',
    dividerBorder: '#141516',
    text: '#fff',
    get text50() {
      return this.text + 80;
    },
  },
  layout: { ...layout },
};
