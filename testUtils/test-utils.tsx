import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react';
import type {RenderOptions} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import type {PreloadedState} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {RootState} from '../src/store';

import {listModel} from '../src/store/list';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({reducer: {listModel: listModel}, preloadedState}),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
