// libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// misc
import { ContainerState } from './types';
import { THEME_KEY } from '@constants/constants';
import { Mode } from '@styles/types';

export const initialState: ContainerState = {
  mode: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<{ mode: Mode }>) {
      const { mode } = action.payload;
      state.mode = mode;
      AsyncStorage.setItem(THEME_KEY, mode);
    },
  },
});
