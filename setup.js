/* eslint-disable no-undef */
// file to mock app node modules for testing

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
//setupJest.js or similar file
import 'whatwg-fetch';

global.XMLHttpRequest = require('xhr2');
global.window = {};
global.window = global;

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ goBack: jest.fn() }),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.setTimeout(200000);

global.fetch = fetch;
