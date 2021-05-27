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
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// import DRIVER_SVG from './assets/app/driver.svg';
import DRIVER_SVG from '../../../../assets/app/driver.svg';
const {height, width} = Dimensions.get('window');

const CONTENTS = [
  {
    name: 'Important Lesson',
    color: '#E9C46A',
    backgroundColor: 'rgba(233, 196, 106, 0.2)',
  },
  {
    name: 'Quiz',
    color: '#F4A261',
    backgroundColor: 'rgba(244, 162, 97, 0.2)',
  },
  {
    name: 'Required Documents',
    color: '#E76F51',
    backgroundColor: 'rgba(231, 111, 81, 0.2)',
  },
  {
    name: 'Vision Test',
    color: '#E97C61',
    backgroundColor: 'rgba(233, 124, 97, 0.2)',
  },
  {
    name: 'Traffic Sign',
    color: '#EB886F',
    backgroundColor: 'rgba(235, 136, 111, 0.2)',
  },
  {
    name: 'Date Converter',
    color: '#2A9D8F',
    backgroundColor: 'rgba(42, 157, 143, 0.2)',
  },
  {
    name: 'Trial',
    color: '#EF9D88',
    backgroundColor: 'rgba(239, 157, 136, 0.2)',
  },
  {
    name: 'Driving Centers',
    color: '#F0A693',
    backgroundColor: 'rgba(240, 166, 147, 0.2)',
  },
  {
    name: 'Registration',
    color: '#264653',
    backgroundColor: 'rgba(38, 70, 83, 0.2)',
  },
];

//Header
const Header = ({animation}) => {
  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={[styles.svgWrapper, {transform: [{scale: animation}]}]}>
        <DRIVER_SVG height={width - 85} width={width - 80} />
      </Animated.View>
    </View>
  );
};

const Content = ({navigate}) => {
  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={CONTENTS}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('TrafficSign')}
            style={styles.contentItemWrapper}>
            <View
              style={[
                styles.contentItem,
                {backgroundColor: item.backgroundColor},
              ]}>
              <Icon name="book" size={25} color={item.color} />
            </View>
            <Text style={styles.contentText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export const HomePage = () => {
  const {navigate} = useNavigation();
  const ScrollSVG = useRef(new Animated.Value(0)).current;
  const SVGIMAGE = ScrollSVG.interpolate({
    inputRange: [0, 45, 200],
    outputRange: [1, 0.9, 0.9],
    extrapolate: 'clamp',
  });
  return (
    <SafeAreaView style={styles.container}>
      <Header animation={SVGIMAGE} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: ScrollSVG}},
            },
          ],
          {useNativeDriver: true},
        )}>
        <Content navigate={navigate} />
        <View style={{height: 100}} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  headerContainer: {
    height: height / 2.8,
    backgroundColor: '#E9C46A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
  },
  svgWrapper: {
    position: 'absolute',
    top: -19,
    zIndex: 2,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentItemWrapper: {
    width: width / 3.5,
    padding: 10,
  },
  contentItem: {
    width: width / 4,
    height: width / 4,
    borderRadius: 15,
    // opacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    textAlign: 'center',
  },
});
