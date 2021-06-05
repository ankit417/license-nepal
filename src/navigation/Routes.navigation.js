import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from '../screens/homePage/screen';
import {TrafficSign} from '../screens/trafficSignScreen/screen/trafficSign.screen';
import {ImportantLesson} from '../screens/lessons/screen';
import {Quiz, QuizSet} from '../screens/quizScreen/screen';
import {DateConverter} from '../screens/DateConvert/screen';
const MainApp = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainApp.Navigator headerMode={false}>
        <MainApp.Screen name="Home" component={HomePage} />
        <MainApp.Screen name="ImportantLesson" component={ImportantLesson} />
        <MainApp.Screen name="QuizSet" component={QuizSet} />
        <MainApp.Screen name="Quiz" component={Quiz} />
        <MainApp.Screen name="DateConvert" component={DateConverter} />
        <MainApp.Screen name="TrafficSign" component={TrafficSign} />
      </MainApp.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
