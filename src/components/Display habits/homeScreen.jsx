import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddHabitForm from '../Add habit/addHabitForm';
import EditMenu from '../Menu/Menu';
import HabitsView from './habitView';
import {
  createNewHabit,
  deleteHabit,
  getHabits,
  updateHabitOrder,
} from '../../services/habitService';
import {backgroundColors} from '../../consts/colors';
import {isPortrait} from '../../consts/helpers';
import {firebase} from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LoginScreen from '../Auth/LoginScreen';
import Search from '../Menu/Search';

const HomeScreen = () => {
  const [habitData, setHabitData] = useState();
  const [editingItems, setEditingItems] = useState(false);
  const backgroundColor = backgroundColors[new Date().getDay()];
  const [isLandscape, setIsLandscape] = useState(!isPortrait());
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [uid, setUid] = useState();
  const viewRef = useRef();

  const editItems = () => {
    setEditingItems(!editingItems);
  };

  async function onAuthStateChanged(user_) {
    setUser(user_);
    if (user_ !== null) {
      var habits = await getHabits(user_.uid);
      setHabitData(habits);
      setUid(user_.uid);
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  async function refreshHabits() {
    var habits = await getHabits(firebase.auth().currentUser.uid);
    setHabitData(habits);
  }

  const onMoveHabit = async (name, direction) => {
    console.log(Object.keys(habitData));
    var newOrder = [...Object.keys(habitData)];
    if (direction === -1 && newOrder.indexOf(name) === 0) {
      return;
    }
    if (direction === 1 && newOrder.indexOf(name) === newOrder.length - 1) {
      return;
    }
    var index = newOrder.indexOf(name);
    var temp = newOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;
    var newHabitData = {};
    newOrder.forEach(habitName => {
      newHabitData[habitName] = habitData[habitName];
    });
    updateHabitOrder(uid, newOrder);

    setHabitData(newHabitData);
  };

  useEffect(() => {
    const callback = () => setIsLandscape(!isPortrait());

    var handler = Dimensions.addEventListener('change', callback);

    return () => {
      handler.remove();
    };
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '132172467389-ecspj25d3ppvm4lirv6vc7l9099r67vv.apps.googleusercontent.com',
    });
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const addHabit = async name => {
    createNewHabit(uid, name);
    var newHabitData = {...habitData};
    newHabitData[name] = {
      data: {
        [new Date().getFullYear()]: Array(365).fill(0),
      },
      notes: {
        [new Date().getFullYear()]: Array(365).fill(''),
      },
    };
    setHabitData(newHabitData);
  };

  const onDeleteHabit = habitName => {
    deleteHabit(habitName);
    var newHabitData = {...habitData};
    delete newHabitData[habitName];
    setHabitData(newHabitData);
    setEditingItems(false);
  };

  return (
    <View style={{...styles.container, backgroundColor: backgroundColor}}>
      {user ? (
        initializing ? (
          <View />
        ) : (
          <Pressable onPress={() => setEditingItems(false)}>
            <View
              style={{
                ...styles.header,
                marginTop: isLandscape ? 10 : 70,
                marginLeft: isLandscape ? 50 : 10,
              }}>
              <Search onPress={index => viewRef.current.scrollToIndex(index)} />
              <AddHabitForm addHabit={addHabit} />

              <EditMenu editItems={editItems} />
            </View>
            <HabitsView
              ref={viewRef}
              habits={habitData}
              editMode={editingItems}
              onDeleteHabit={onDeleteHabit}
              isLandscape={isLandscape}
              onMoveHabit={onMoveHabit}
              refreshHabits={refreshHabits}
              setEditMode={setEditingItems}
            />
          </Pressable>
        )
      ) : (
        <LoginScreen />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: 10,
  },
});
