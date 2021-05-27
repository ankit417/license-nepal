import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from '../screens/homePage/screen';

const MainApp = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainApp.Navigator>
        <MainApp.Screen name="Home" component={HomePage} />
      </MainApp.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
