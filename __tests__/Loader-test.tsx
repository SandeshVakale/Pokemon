import 'react-native';
import React from 'react';
import Loader from '../src/components/loader';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders loader correctly', async () => {
  const tree = renderer.create(<Loader />).toJSON();

  expect(tree).toMatchSnapshot();
});
