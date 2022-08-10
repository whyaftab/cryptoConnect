/* eslint-disable no-undef */
// connect screen test case

// import 'react-native';
// libraries
import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import unmock, { transform } from 'unmock';
import { act } from 'react-test-renderer';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

// misc
import { BASE_URL } from '@constants/constants';
import { BinanceConnectScreen } from '@screens/Public/Auth';
import { store } from '@store/store';
import { darkTheme } from '@styles/themes';

const errorMessage = 'Internal Error!';

// test case
describe('connect to binance', () => {
  // api mocking after all test run
  beforeAll(() => {
    unmock.on();
    unmock
      .nock(BASE_URL, 'authApi')
      .get('/users/1')
      .reply(200, { testss: 'test' })
      .reply(500, { errorMessage });
  });

  // reset before each test case run
  beforeEach(() => {
    unmock.reset();
    jest.setTimeout(20000);
  });

  // reset api mocking after all test run
  afterAll(() => {
    unmock.off();
  });

  // on success of connect process case
  it('on successfully connect user', async () => {
    const api = unmock.services['authApi'];
    api.state(transform.withCodes(200));
    render(
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <BinanceConnectScreen />
          <Toast />
        </ThemeProvider>
      </Provider>,
    );

    const apiKey = await screen.getByTestId('api_key');
    fireEvent.changeText(apiKey, 'test');
    fireEvent.changeText(await screen.getByTestId('secret_key'), 'test');
    await act(async () => {
      fireEvent.press(await screen.getByTestId('submit'));
    });

    await waitFor(
      () => {
        const errorText = screen.queryByText('Something went wrong!');

        return expect(errorText).toBeNull();
      },
      {
        timeout: 10000,
      },
    );
  });

  // on success of connect process case
  it('on error connect user', async () => {
    const api = unmock.services['authApi'];
    api.state(transform.withCodes(500));
    render(
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <BinanceConnectScreen />
          <Toast />
        </ThemeProvider>
      </Provider>,
    );

    const apiKey = await screen.getByTestId('api_key');
    fireEvent.changeText(apiKey, 'test');
    fireEvent.changeText(await screen.getByTestId('secret_key'), 'test');
    await act(async () => {
      fireEvent.press(await screen.getByTestId('submit'));
    });

    await waitFor(
      () => {
        return screen.getByText('Something went wrong!');
      },
      {
        timeout: 10000,
      },
    );
  });
});
