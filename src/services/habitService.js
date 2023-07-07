import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getHabits = async uid => {
  var res = await firestore().collection('habits').doc(uid).get();
  if (res.data() == null) {
    createNewHabits(uid);
  }
  checkHabitDates(uid);
  var res = await firestore().collection('habits').doc(uid).get();
  return res.data();
};

const checkHabitDates = async uid => {
  var res = await firestore().collection('habits').doc(uid).get();
  var habits = res.data();
  var today = new Date();
  Object.entries(habits).forEach(([key, value]) => {
    var year = new Date().getFullYear().toString();
    if (!Object.keys(value.data).includes(year)) {
      value.data[year] = Array(365).fill(0);
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
    console.log(index[1]);
    console.log(state);
    await firestore()
      .collection('habits')
      .doc(uid)
      .update({
        [habitName]: {
          data: newData,
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
        },
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
      },
    });
};
