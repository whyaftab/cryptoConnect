// libraries
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

  if (isRejectedWithValue(action)) {
    Toast.show({
      type: 'error',
      text1: action?.error?.data?.message || 'Something went wrong!',
      text2: 'If the issue continues please try again after sometime.',
    });
  }

  return next(action);
};
