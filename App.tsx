/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NUM_OF_DAYS} from './consts/globals';
import HabitsView from './components/Display habits/habitView';
import AddHabitForm from './components/Add habit/addHabitForm';
import LoginScreen from './components/Auth/LoginScreen';
import {backgroundColors} from './consts/colors';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function App(): JSX.Element {
  const backgroundColor = backgroundColors[new Date().getDay()];
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [habitData, setHabitData] = useState({
    names: ['Gym', 'Guitar', 'Coding', 'Reading'],
    data: [
      Array(NUM_OF_DAYS).fill(0),
      Array(NUM_OF_DAYS).fill(0),
      Array(NUM_OF_DAYS).fill(0),
      Array(NUM_OF_DAYS).fill(0),
    ],
  });

  // Handle user state changes
  function onAuthStateChanged(user_: any) {
    setUser(user_);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '132172467389-t1v53cfsmrsuvmk8mq3tg25si2sf9r36.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const addHabit = (name: string) => {
    var newHabitData = {...habitData};
    newHabitData.names.push(name);
    newHabitData.data.push(Array(NUM_OF_DAYS).fill(0));
    console.log(newHabitData);
    setHabitData(newHabitData);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      {user ? (
        <View>
          <AddHabitForm addHabit={addHabit} />
          <HabitsView habits={habitData} />
        </View>
      ) : (
        <LoginScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
