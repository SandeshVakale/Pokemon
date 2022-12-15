/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {renderHook} from '@testing-library/react-hooks';
import * as Font from 'expo-font';
import {
  useFonts,
  Lexend_100Thin,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
} from '@expo-google-fonts/lexend';
import {renderWithProviders} from '../testUtils/test-utils';
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('expo-font', () => ({
  __esModule: true,
  ...jest.requireActual('expo-font'),
}));

it('renders App Lodaer correctly', async () => {
  await act(async () => {
    renderer.create(<App />).toJSON();
  });
});

it('renders App container correctly', async () => {
  // @ts-ignore:next-line
  jest.spyOn(Font, 'loadAsync').mockResolvedValue(true);

  const hook = renderHook(() =>
    useFonts([
      Lexend_100Thin,
      Lexend_300Light,
      Lexend_400Regular,
      Lexend_500Medium,
      Lexend_600SemiBold,
      Lexend_700Bold,
      Lexend_800ExtraBold,
    ]),
  );

  await hook.waitForNextUpdate();

  await act(async () => {
    const tree = await renderWithProviders(<App />);

    expect(tree).toMatchSnapshot();
  });
});
