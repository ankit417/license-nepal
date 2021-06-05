import 'react-native';
import React from 'react';
import '@react-navigation/native';
// import {create} from 'react-test-renderer';
import renderer from 'react-test-renderer';

import App from '../App';
import {createStackNavigator} from '@react-navigation/stack';
// jest.mock('@react-navigation/native');
// const tree = create(<HomePage />);
global.fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-navigation/stack', () => {});
// jest.mock('@react-navigation/native', () => {});

// jest.mock(createStackNavigator(), () => {});
test('Home Page snapshot', () => {
  // expect(tree).toMatchSnapshot();
  const snap = renderer.create(<App />).toJSON();

  expect(snap).toMatchSnapshot();
});
