// misc
import { selectUser } from '@screens/Public/Auth/selectors';
import { resetAuth, setAuth } from '@screens/Public/Auth/slice';
import { BinanceConnectResponse } from '@screens/Public/Auth/types';
import { useAppDispatch, useAppSelector } from './useReduxHook';
import { authApi } from '@screens/Public/Auth/api';

export const useAuth = () => {
  // variables
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const setUser = async (data: BinanceConnectResponse) => {
    dispatch(setAuth(data));
  };

  const reset = async () => {
    dispatch(authApi.util.resetApiState());
    dispatch(resetAuth());
  };

  // returns
  return {
    setUser,
    user,
    isAuthorized: !!user,
    reset,
  };
};
