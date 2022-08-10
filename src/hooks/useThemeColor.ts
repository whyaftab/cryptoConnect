// libraries
import { Platform, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

// misc
import { Mode } from '@styles/types';
import { THEME_KEY } from '@constants/constants';
import { getAsyncStorageValue } from '@helpers/utils';
import { themeSlice } from '@styles/slice';
import { selectTheme } from '@styles/selectors';
import { darkTheme, lightTheme } from '@styles/themes';

export const useThemeColor = () => {
  // variables
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const userPhoneTheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  // functions
  const setMode = async (mode: Mode) => {
    dispatch(themeSlice.actions.setTheme({ mode: mode }));
    setStatusBarStyle(mode);
  };

  const setStatusBarStyle = (mode: Mode | null) => {
    StatusBar.setBarStyle(mode === 'dark' ? 'light-content' : 'dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(
        mode === 'dark' ? darkTheme.colors.primaryBackground : lightTheme.colors.primaryBackground,
      );
    }
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  const populateTheme = async () => {
    const localTheme = (await getAsyncStorageValue(THEME_KEY)) as Mode | null;
    setStatusBarStyle(localTheme);
    if (localTheme) dispatch(themeSlice.actions.setTheme({ mode: localTheme }));
    else dispatch(themeSlice.actions.setTheme({ mode: userPhoneTheme }));
  };

  // returns
  return { themeToggler, populateTheme };
};
