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
import Arrow from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');
const SPACING = 25;

const CONTENTS = [
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
  {
    set: 'Lorem ipsum is the dummy text',
  },
];

//Header
const Header = () => {
  const {navigate, goBack} = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <Icon
        onPress={() => goBack()}
        name="arrow-back-outline"
        size={30}
        color="#FFF"
      />
      <Text style={styles.headerText}>Quiz Set</Text>
    </View>
  );
};

export const QuizSet = () => {
  const {navigate, goBack} = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E9C46A" />
      <Header />

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
            <Animated.View style={[{transform: [{scale}]}]}>
              <TouchableOpacity
                onPress={() => {
                  navigate('Quiz');
                }}
                style={styles.contentWrapper}>
                <View style={styles.contentIcon}>
                  <Icon name="book" size={25} />
                </View>
                <View style={styles.lessonTextWrapper}>
                  <Text style={styles.lessonText}>{item.set}</Text>
                </View>
                <View style={styles.nextArrow}>
                  <Arrow name="arrowright" size={25} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

// export const QuizSet = () => {
//   return (
//     <View>
//       <Text>Hello</Text>
//     </View>
//   );
// };
const styles = StyleSheet.create({
  //   Header
  headerWrapper: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#E9C46A',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
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
