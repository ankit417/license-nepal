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

const {height, width} = Dimensions.get('window');
const SPACING = 25;

const CONTENTS = [
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
  {
    lesson: 'Lorem ipsum is the dummy text',
  },
];

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.contentMainWrapper}> */}
      <Animated.FlatList
        data={CONTENTS}
        contentContainerStyle={{
          padding: SPACING,
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const inputRange = [-1, 0, 90 * index, 90 * (index + 2)];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={[styles.contentWrapper, {transform: [{scale}]}]}>
              <View style={styles.contentIcon}>
                <Icon name="book" size={25} />
              </View>
              <View style={styles.lessonTextWrapper}>
                <Text style={styles.lessonText}>{item.lesson}</Text>
              </View>
              <View style={styles.nextArrow}>
                <Icon name="book" size={25} />
              </View>
            </Animated.View>
          );
        }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  // contentMainWrapper: {
  //   marginHorizontal: SPACING,
  // },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(233, 196, 106, 0.2)',
    paddingVertical: 20,
    borderRadius: 15,
  },
  contentIcon: {
    paddingLeft: 10,
  },
  lessonTextWrapper: {
    width: '70%',
  },
  lessonText: {
    fontWeight: '700',
  },
  nextArrow: {
    paddingRight: 10,
  },
});

export default App;
