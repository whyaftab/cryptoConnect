// libraries
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@store/baseQuery';

// misc
import { BinanceConnectPayload, BinanceConnectResponse } from './types';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    binanceConnect: builder.mutation<BinanceConnectResponse, BinanceConnectPayload>({
      query: () => {
        return {
          url: '/users/1',
          method: 'get',
          validateStatus: response => {
            return response.status === 200;
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useBinanceConnectMutation } = authApi;
