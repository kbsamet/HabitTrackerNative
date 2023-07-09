import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {createNewNote, createNewNotes} from './noteService';

export const getHabits = async uid => {
  var res = await firestore().collection('habits').doc(uid).get();
  if (res.data() == null) {
    await createNewHabits(uid);
  }
  checkHabitDates(uid);
  var res = await firestore().collection('habits').doc(uid).get();
  var order = await getHabitOrder(uid);
  //sort habit keys based on order
  var habits = {};
  order.forEach(habitName => {
    habits[habitName] = res.data()[habitName];
  });
  return habits;
};

const getHabitOrder = async uid => {
  var res = await firestore().collection('habitOrders').doc(uid).get();
  return res.data().order;
};

export const updateHabitOrder = async (uid, order) => {
  try {
    await firestore().collection('habitOrders').doc(uid).set({
      order: order,
    });
  } catch (error) {
    console.log(error);
  }
};

const checkHabitDates = async uid => {
  var res = await firestore().collection('habits').doc(uid).get();
  var habits = res.data();
  var today = new Date();
  Object.entries(habits).forEach(([key, value]) => {
    var year = new Date().getFullYear().toString();
    if (!Object.keys(value.data).includes(year)) {
      console.log('year not found');
      console.log(key);
      value.data[year] = Array(365).fill(0);
      value.notes[year] = Array(365).fill('');
      firestore()
        .collection('habits')
        .doc(uid)
        .update({
          [key]: value,
        });
    }
  });
};

export const updateHabitState = async (habitName, index, state) => {
  try {
    var uid = auth().currentUser.uid;
    var res = await firestore().collection('habits').doc(uid).get();
    var newData = res.data()[habitName].data;
    newData[index[0]][index[1]] = state;
    await firestore()
      .collection('habits')
      .doc(uid)
      .update({
        [habitName]: {
          data: newData,
          notes: res.data()[habitName].notes,
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteHabit = async habitName => {
  try {
    var uid = auth().currentUser.uid;
    var res = await firestore().collection('habits').doc(uid).get();
    var newData = res.data();
    delete newData[habitName];
    await firestore().collection('habits').doc(uid).set(newData);
    await firestore()
      .collection('habitOrders')
      .doc(uid)
      .update({
        order: firestore.FieldValue.arrayRemove(habitName),
      });
  } catch (error) {
    console.log(error);
  }
};

export const createNewHabit = async (uid, habitName) => {
  try {
    var year = new Date().getFullYear();
    await firestore()
      .collection('habits')
      .doc(uid)
      .update({
        [habitName]: {
          data: {
            [year.toString()]: Array(365).fill(0),
          },
          notes: {
            [year.toString()]: Array(365).fill(''),
          },
        },
      });
    await firestore()
      .collection('habitOrders')
      .doc(uid)
      .update({
        order: firestore.FieldValue.arrayUnion(habitName),
      });
  } catch (error) {
    console.log(error);
  }
};

export const createNewHabits = async uid => {
  var year = new Date().getFullYear();
  await firestore()
    .collection('habits')
    .doc(uid)
    .set({
      Gym: {
        data: {
          [year.toString()]: Array(365).fill(0),
        },
        notes: {
          [year.toString()]: Array(365).fill(''),
        },
      },
    });

  await firestore()
    .collection('habitOrders')
    .doc(uid)
    .set({
      order: ['Gym'],
    });
};
