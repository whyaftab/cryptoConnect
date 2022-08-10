// import original module declarations
import 'styled-components';

// extend them
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryReverse: string;
      primary50: string;
      primary25: string;
      primaryBackground: string;
      primaryBackground50: string;
      secondary: string;
      red: string;
      white: string;
      silver: string;
      buttonBackground: string;
      inputBg: string;
      inputErrorBg: string;
      dividerBorder: string;
      text: string;
      text50: string;
      transparent: string;
    };
    layout: {
      window: { width: number; height: number };
      screen: { width: number; height: number };
      padding: number;
      contentPadding: number;
      buttons: {
        height: number;
      };
      borderRadius: number;
    };
  }
}
