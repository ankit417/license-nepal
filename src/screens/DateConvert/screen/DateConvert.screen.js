import React, {useEffect, useState, useRef} from 'react';
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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Arrow from 'react-native-vector-icons/AntDesign';
import ADBS from 'ad-bs-converter';

const {height, width} = Dimensions.get('window');
const SPACING = 25;

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
      <Text style={styles.headerText}>Date Converter</Text>
    </View>
  );
};

export const DateConverter = () => {
  const [BSyear, setYear] = useState('2021');
  const [BSmonth, setMonth] = useState('02');
  const [BSday, setDay] = useState('21');
  const [BSresult, setResult] = useState('');
  const [ADyear, setADYear] = useState('2052');
  const [ADmonth, setADMonth] = useState('08');
  const [ADday, setADDay] = useState('22');
  const [ADresult, setADResult] = useState('');

  const handleChange = (type, e) => {
    switch (type) {
      case 'year':
        e.length < 5 && setYear(e);
        return;
      case 'month':
        e < 13 && setMonth(e);
        return;
      case 'day':
        e < 33 && setDay(e);
        return;
      default:
        return;
    }
  };
  const handleChangeAD = (type, e) => {
    switch (type) {
      case 'year':
        e.length < 5 && setADYear(e);
        return;
      case 'month':
        e < 13 && setADMonth(e);
        return;
      case 'day':
        e < 33 && setADDay(e);
        return;
      default:
        return;
    }
  };

  //This converts AD to BS
  const changeToBs = () => {
    if (BSyear.length == 4) {
      try {
        const convertToBs = ADBS.ad2bs(`${BSyear}/${BSmonth}/${BSday}`);
        //   console.log('convert to BS', convertToBs);

        const {ne} = convertToBs;
        const {year, strMonth, day, strDayOfWeek} = ne;
        setResult(`${year} ${strMonth} ${day} , ${strDayOfWeek}`);
      } catch (e) {}
    }
  };
  //this converts to BS date to AD
  const changeToAD = () => {
    if (ADyear.length == 4) {
      try {
        const convertToAD = ADBS.bs2ad(`${ADyear}/${ADmonth}/${ADday}`);
        //   console.log('convert to AD', convertToAD);
        //   const {ne} = convertToAD;
        const {year, strMonth, day, strDayOfWeek} = convertToAD;
        setADResult(`${year} ${strMonth} ${day} , ${strDayOfWeek}`);
      } catch (e) {}
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E9C46A" />
      <Header />
      {/* convert to AD */}
      <View style={styles.inputMainWrapper}>
        <View style={styles.dateWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              keyboardType="numeric"
              placeholder="YYYY"
              value={ADyear}
              onChangeText={e => {
                handleChangeAD('year', e);
              }}
              style={[styles.input, styles.year]}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="MM"
              value={ADmonth}
              onChangeText={e => {
                handleChangeAD('month', e);
              }}
              style={[styles.input, styles.month]}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="DD"
              value={ADday}
              onChangeText={e => {
                handleChangeAD('day', e);
              }}
              style={[styles.input, styles.date]}
            />
          </View>
          <View style={styles.resultWrapper}>
            <Text style={styles.dateText}>{ADresult}</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => changeToAD()}>
              <Text style={styles.dateText}>Change to AD</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* convert to BS */}
        <View style={styles.dateWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              keyboardType="numeric"
              placeholder="YYYY"
              value={BSyear}
              onChangeText={e => {
                handleChange('year', e);
              }}
              style={[styles.input, styles.year]}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="MM"
              value={BSmonth}
              onChangeText={e => {
                handleChange('month', e);
              }}
              style={[styles.input, styles.month]}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="DD"
              value={BSday}
              onChangeText={e => {
                handleChange('day', e);
              }}
              style={[styles.input, styles.date]}
            />
          </View>
          <View style={styles.resultWrapper}>
            <Text style={styles.dateText}>{BSresult}</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => changeToBs()}>
              <Text style={styles.dateText}>Change to BS</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  inputMainWrapper: {
    marginTop: 40,
  },
  dateWrapper: {
    marginLeft: 20,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: width - 40,
    marginBottom: 20,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  input: {
    borderWidth: 1.3,
    borderRadius: 5,
    height: 50,
    borderColor: 'rgba(42, 157, 143, 1)',
    paddingHorizontal: 8,
  },
  year: {width: width / 4, marginRight: 20},
  month: {width: width / 4.5, marginRight: 20},
  date: {width: width / 4.5},
  resultWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateButton: {
    backgroundColor: 'rgba(42, 157, 143, 0.2)',
    padding: 15,
    borderRadius: 10,
  },
  dateText: {
    color: '#333333',
    fontWeight: 'bold',
  },
});
