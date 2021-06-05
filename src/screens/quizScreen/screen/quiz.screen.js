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
import Arrow from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');
const SPACING = 25;

const CONTENTS = [
  {
    questions:
      'Eritrea, which became the 182nd member of the UN in 1993, is in the continent of',
    options: ['Asia', 'Africa', 'Europe', 'Australia'],
    answer: 1,
  },
  {
    questions: 'Hey',
    options: ['Asia', 'Africa', 'Europe', 'Australia'],
    answer: 1,
  },
  {
    questions: 'Hello',
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
  let revealAnswer = selectedAnswer != null ? true : false;

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

const Bottom = ({count, totalCount, onPrevPressed, onNextPressed}) => {
  const hidePrev = count == 1;
  const hideNext = count == totalCount;
  return (
    <View style={styles.bottomWrapper}>
      <TouchableOpacity
        style={styles.prev}
        onPress={() => !hidePrev && onPrevPressed()}>
        <Arrow
          name="arrowleft"
          size={25}
          color={!hidePrev ? '#000000' : '#eeeeee'}
        />
      </TouchableOpacity>
      <View style={styles.quesCount}>
        <Text>{`${count} / ${totalCount}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.next}
        onPress={() => !hideNext && onNextPressed()}>
        <Arrow
          name="arrowright"
          size={25}
          color={!hideNext ? '#000000' : '#eeeeee'}
        />
      </TouchableOpacity>
    </View>
  );
};

export const Quiz = () => {
  const [selected, setSelected] = useState(CONTENTS[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answer, setAnswer] = useState(CONTENTS[0].answer);
  console.log('selec', selected);

  const nextPressed = () => {
    console.log('============>');
    setSelected(CONTENTS[selectedIndex + 1]);
    setAnswer(CONTENTS[selectedIndex + 1].answer);
    setSelectedIndex(prev => prev + 1);
    setSelectedAnswer(null);
  };

  const prevPressed = () => {
    setSelected(CONTENTS[selectedIndex - 1]);
    setAnswer(CONTENTS[selectedIndex - 1].answer);
    setSelectedIndex(prev => prev - 1);
    setSelectedAnswer(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2A9D8F" />

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
      <Bottom
        count={selectedIndex + 1}
        totalCount={CONTENTS.length}
        onPrevPressed={() => prevPressed()}
        onNextPressed={() => nextPressed()}
      />
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
