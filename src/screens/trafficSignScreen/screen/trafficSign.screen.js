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
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import LIMIT from '../../../../assets/app/40.png';
import DONTSTOP from '../../../../assets/app/cross.png';

const {height, width} = Dimensions.get('window');

const CONTENTS = [
  {
    name: 'रोक्न निषेध',
    icon: DONTSTOP,
  },
  {
    name: 'अधिकतम गति सीमा',
    icon: LIMIT,
  },
  {
    name: 'रोक्न निषेध',
    icon: DONTSTOP,
  },
  {
    name: 'अधिकतम गति सीमा',
    icon: LIMIT,
  },
  {
    name: 'रोक्न निषेध',
    icon: DONTSTOP,
  },
  {
    name: 'अधिकतम गति सीमा',
    icon: LIMIT,
  },
  {
    name: 'रोक्न निषेध',
    icon: DONTSTOP,
  },
  {
    name: 'अधिकतम गति सीमा',
    icon: LIMIT,
  },
  {
    name: 'रोक्न निषेध',
    icon: DONTSTOP,
  },
  {
    name: 'अधिकतम गति सीमा',
    icon: LIMIT,
  },
];

//Header
const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <Icon name="arrow-back-outline" size={30} color="#FFF" />
      <Text style={styles.headerText}>Traffic Signs</Text>
    </View>
  );
};

export const TrafficSign = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <FlatList
          style={{paddingVertical: 20}}
          data={CONTENTS}
          renderItem={({item}) => (
            <View style={styles.contentItemWrapper}>
              <Image style={styles.contentImage} source={item.icon} />
              <Text style={styles.contentText}>{item.name}</Text>
            </View>
          )}
          numColumns={3}
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
    alignItems: 'center',
  },
  contentItemWrapper: {
    width: width / 3.5,
    padding: 10,
  },
  contentImage: {
    height: width / 5,
    width: width / 5,
  },
  contentText: {
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 14,
  },
});
