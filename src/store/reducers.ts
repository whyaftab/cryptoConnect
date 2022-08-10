// reducers
import { authApi } from '@screens/Public/Auth/api';
import { authSlice } from '@screens/Public/Auth/slice';
import { themeSlice } from '@styles/slice';

export const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
};
