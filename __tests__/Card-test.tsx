import 'react-native';
import React from 'react';
import {Card} from '../src/components/card';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  const tree = renderer
    .create(
      <Card
        index={1}
        pokemon={{
          name: 'Sandesh',
          url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        }}
        isColored={false}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
