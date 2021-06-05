import React, {useEffect, useState} from 'react';
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
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import LIMIT from '../../../../assets/app/40.png';
import DONTSTOP from '../../../../assets/app/cross.png';

const {height, width} = Dimensions.get('window');

const CONTENTS = [
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '74',
    color: '#E9C46A',
    backgroundColor: 'rgba(233, 196, 106, 0.2)',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '23',
    color: '#F4A261',
    backgroundColor: 'rgba(244, 162, 97, 0.2)',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '4',
    color: '#E76F51',
    backgroundColor: 'rgba(231, 111, 81, 0.2)',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '12',
    color: '#2A9D8F',
    backgroundColor: 'rgba(42, 157, 143, 0.2)',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '0',
    color: '#EF9D88',
    backgroundColor: 'rgba(239, 157, 136, 0.2)',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '45',
    color: '#F0A693',
    backgroundColor: 'rgba(240, 166, 147, 0.2)',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/300px-Ishihara_9.svg.png',
    answer: '45',
    color: '#264653',
    backgroundColor: 'rgba(38, 70, 83, 0.2)',
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
      <Text style={styles.headerText}>Vision Test</Text>
    </View>
  );
};

// CARD
const FlipCard = ({data}) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [value, setValue] = useState(0);

  useEffect(() => {
    animatedValue.addListener(({value}) => {
      setValue(value);
      console.log('value', value);
    });
  }, []);

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <TouchableOpacity onPress={() => flipCard()} style={{position: 'relative'}}>
      <Animated.View
        style={[
          {
            transform: [
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 180],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
            backgroundColor: '#FFF',
          },
          styles.contentItemWrapper,
        ]}>
        <Image
          style={styles.contentImage}
          source={{
            uri: data.photo,
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 180],
                  outputRange: ['180deg', '360deg'],
                }),
              },
            ],
            backgroundColor: data.backgroundColor,
          },
          styles.contentItemWrapper,
          styles.backItemWrapper,
        ]}>
        <View style={styles.answer}>
          <Text style={[styles.answerText, {color: data.color}]}>
            {data.answer}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ColorVision = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          style={{paddingVertical: 20}}
          data={CONTENTS}
          renderItem={({item}) => <FlipCard data={item} />}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

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

  //   Container
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  contentItemWrapper: {
    flex: 0.5,
    // backgroundColor: '#FFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    backfaceVisibility: 'hidden',
  },
  backItemWrapper: {
    position: 'absolute',
    top: 0,
  },
  contentImage: {
    height: width / 2.8,
    width: width / 2.8,
  },
  answer: {
    height: width / 2.8,
    width: width / 2.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 14,
  },
  answerText: {
    fontSize: 80,
    fontWeight: 'bold',
  },
});
