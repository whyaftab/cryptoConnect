// libraries
import { configureStore } from '@reduxjs/toolkit';

// misc
import { reducers } from './reducers';
import { authApi } from '@screens/Public/Auth/api';
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([authApi.middleware, rtkQueryErrorLogger]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
