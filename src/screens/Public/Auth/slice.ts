import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BinanceConnectResponse, User } from './types';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<BinanceConnectResponse>) => {
      state.user = action.payload;
    },
    reset: () => initialState,
    defaultState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, defaultState, reset: resetAuth } = authSlice.actions;

export default authSlice.reducer;
