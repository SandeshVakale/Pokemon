import 'react-native';
import React from 'react';
import Error from '../src/components/error';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders error correctly', async () => {
  const tree = renderer
    .create(
      <Error
        error={{
          isError: true,
          message: 'Something went wrong',
          code: '009',
        }}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
