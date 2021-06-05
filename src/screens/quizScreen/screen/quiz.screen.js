import React, {useRef, useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');
const SPACING = 25;

const CONTENTS = [
  {
    questions:
      'Eritrea, which became the 182nd member of the UN in 1993, is in the continent of',
    options: ['Asia', 'Africa', 'Europe', 'Australia'],
    answer: 1,
  },
];

const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.bubble} />
      <View style={styles.bubbleRight} />
    </View>
  );
};

const Question = ({question}) => {
  return (
    <View style={styles.questionWrapper}>
      <Text>{question}</Text>
    </View>
  );
};

const Options = ({options, selectedAnswer, answer, userSelect}) => {
  // console.log('options ', options);
  let revealAnswer = selectedAnswer != null ? true : false;
  //  let revealAnswer = selectedAnswer != null ? true : false;

  return (
    <View style={styles.optionWrapper}>
      {options.map((item, index) => {
        let answerSelected = index === selectedAnswer;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionsItem,
              {
                backgroundColor:
                  revealAnswer && index === answer ? '#2A9D8F' : '#fff',
              },
            ]}
            onPress={() => selectedAnswer == null && userSelect(index)}>
            <Text>{item}</Text>
            <View
              style={[
                styles.optionsCheck,
                {
                  backgroundColor: answerSelected ? '#EB886F' : '#eee',
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Bottom = ({count, totalCount}) => {
  return (
    <View style={styles.bottomWrapper}>
      <View style={styles.prev}>
        <Icon name="book" size={25} />
      </View>
      <View style={styles.quesCount}>
        <Text>{`${count}/${totalCount}`}</Text>
      </View>
      <View style={styles.next}>
        <Icon name="book" size={25} />
      </View>
    </View>
  );
};

export const Quiz = () => {
  const [selected, setSelected] = useState(CONTENTS[0]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answer, setAnswer] = useState(CONTENTS[0].answer);
  console.log('selec', selected);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Question question={selected.questions} />
      <ScrollView style={{marginBottom: 70, top: -30}}>
        <Options
          options={selected.options}
          selectedAnswer={selectedAnswer}
          answer={answer}
          userSelect={setSelectedAnswer}
        />
      </ScrollView>
      <Bottom count={selectedIndex} totalCount={CONTENTS.length} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  headerWrapper: {
    height: height / 4.5,
    backgroundColor: '#2A9D8F',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bubble: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(233, 196, 106, 0.3)',
    position: 'absolute',
    left: -50,
  },
  bubbleRight: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(244, 162, 97, 0.3)',
    position: 'absolute',
    right: -75,
    top: -60,
  },
  questionWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width / 1.1,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 15,
    top: -50,
  },
  optionWrapper: {
    marginHorizontal: SPACING,
  },
  optionsItem: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsCheck: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
  },
  bottomWrapper: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SPACING,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 20,
  },
  prev: {},
  quesCount: {},
  next: {},
});
