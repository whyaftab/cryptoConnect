// libraries
import { createDraftSafeSelector } from '@reduxjs/toolkit';

// misc
import { RootState } from '@store/store';
import { initialState } from './slice';

const selectThemeState = (state: RootState) => state.theme || initialState;

export const selectTheme = createDraftSafeSelector(
  [selectThemeState],
  themeState => themeState.mode,
);
