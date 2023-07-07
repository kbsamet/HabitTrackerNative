/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import HabitsView from './src/components/Display habits/habitView';
import AddHabitForm from './src/components/Add habit/addHabitForm';
import LoginScreen from './src/components/Auth/LoginScreen';
import {backgroundColors} from './src/consts/colors';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {MenuProvider} from 'react-native-popup-menu';
import EditMenu from './src/components/Menu/Menu';
import {
  createNewHabit,
  deleteHabit,
  getHabits,
} from './src/services/habitService';

function App(): JSX.Element {
  const backgroundColor = backgroundColors[new Date().getDay()];
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [editingItems, setEditingItems] = useState(false);
  const [uid, setUid] = useState();

  const [habitData, setHabitData] = useState();

  // Handle user state changes
  async function onAuthStateChanged(user_: any) {
    setUser(user_);
    if (user_ !== null) {
      var habits = await getHabits(user_.uid);
      setHabitData(habits);
      setUid(user_.uid);
      console.log(habits);
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '132172467389-ecspj25d3ppvm4lirv6vc7l9099r67vv.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const editItems = () => {
    setEditingItems(!editingItems);
  };

  const addHabit = async (name: string) => {
    createNewHabit(uid, name);
    var newHabitData = {...habitData};
    newHabitData[name] = {
      data: {
        [new Date().getFullYear()]: Array(365).fill(0),
      },
    };
    setHabitData(newHabitData);
  };

  const onDeleteHabit = (habitName: string) => {
    deleteHabit(habitName);
    var newHabitData = {...habitData};
    delete newHabitData[habitName];
    setHabitData(newHabitData);
    setEditingItems(false);
  };

  return (
    <MenuProvider>
      <SafeAreaView
        style={{...styles.container, backgroundColor: backgroundColor}}>
        {user ? (
          <Pressable onPress={() => setEditingItems(false)}>
            <View style={styles.header}>
              <View />
              <AddHabitForm addHabit={addHabit} />

              <EditMenu editItems={editItems} />
            </View>
            <HabitsView
              habits={habitData}
              editMode={editingItems}
              onDeleteHabit={onDeleteHabit}
            />
          </Pressable>
        ) : (
          <LoginScreen />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});

export default App;
