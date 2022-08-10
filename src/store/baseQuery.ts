// libraries
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

// misc
import { BASE_URL } from '@constants/constants';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    headers.append('accept', `application/json`);
    return headers;
  },
});
