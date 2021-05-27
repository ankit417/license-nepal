import React from 'react';
import {create} from 'react-test-renderer';

import {HomePage} from '../src/screens/homePage/screen';

const tree = create(<HomePage />);

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
