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
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PushNotification, {Importance} from 'react-native-push-notification';

// import DRIVER_SVG from './assets/app/driver.svg';
import DRIVER_SVG from '../../../../assets/app/driver.svg';
import {useEffect} from 'react/cjs/react.development';
const {height, width} = Dimensions.get('window');

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'ankit1', // (required)
    channelName: 'My fchannel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const CONTENTS = [
  {
    name: 'Important Lesson',
    color: '#E9C46A',
    backgroundColor: 'rgba(233, 196, 106, 0.2)',
    navigate: 'ImportantLesson',
  },
  {
    name: 'Quiz',
    color: '#F4A261',
    backgroundColor: 'rgba(244, 162, 97, 0.2)',
    navigate: 'QuizSet',
  },
  {
    name: 'Required Documents',
    color: '#E76F51',
    backgroundColor: 'rgba(231, 111, 81, 0.2)',
    navigate: 'TrafficSign',
  },
  {
    name: 'Vision Test',
    color: '#E97C61',
    backgroundColor: 'rgba(233, 124, 97, 0.2)',
    navigate: 'TrafficSign',
  },
  {
    name: 'Traffic Sign',
    color: '#EB886F',
    backgroundColor: 'rgba(235, 136, 111, 0.2)',
    navigate: 'TrafficSign',
  },
  {
    name: 'Date Converter',
    color: '#2A9D8F',
    backgroundColor: 'rgba(42, 157, 143, 0.2)',
    navigate: 'DateConvert',
  },
  {
    name: 'Trial',
    color: '#EF9D88',
    backgroundColor: 'rgba(239, 157, 136, 0.2)',
    navigate: 'TrafficSign',
  },
  {
    name: 'Driving Centers',
    color: '#F0A693',
    backgroundColor: 'rgba(240, 166, 147, 0.2)',
    navigate: 'TrafficSign',
  },
  {
    name: 'Registration',
    color: '#264653',
    backgroundColor: 'rgba(38, 70, 83, 0.2)',
    navigate: 'TrafficSign',
  },
];

const test = () => {
  PushNotification.localNotification({
    channelId: 'ankit1',
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    title: 'this is title', // (optional)
    message: 'this is message', // (required)
    actions: ['Yes', 'No'],
    bigPictureUrl:
      'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg',
    when: Date.now(), // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: true,
  });
};
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
            onPress={() => test()}
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
      <StatusBar backgroundColor="#E9C46A" />
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
