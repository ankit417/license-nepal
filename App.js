import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MainApp from './src/navigation/Routes.navigation';

const App = () => {
  return <MainApp />;
};

export default App;
