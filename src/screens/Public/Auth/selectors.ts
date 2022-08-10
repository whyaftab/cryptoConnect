// libraries
import { createDraftSafeSelector } from '@reduxjs/toolkit';

// misc
import { RootState } from '@store/store';
import { initialState } from './slice';

const selectAuthState = (state: RootState) => state.auth || initialState;

export const selectUser = createDraftSafeSelector([selectAuthState], authState => authState.user);
