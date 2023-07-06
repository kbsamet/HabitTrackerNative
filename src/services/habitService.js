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
    var lastDate = new Date(value.data[value.data.length - 1].date);
    if (
      Math.round(today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24) >
      50
    ) {
      var newDate = new Date();
      value.data.push({
        date: newDate.toString(),
        data: Array(50).fill(0),
      });
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
    newData[index[0]].data[index[1]] = state;
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
    var today = new Date();
    console.log(uid);
    await firestore()
      .collection('habits')
      .doc(uid)
      .update({
        [habitName]: {
          data: [
            {
              date: today.toString(),
              data: Array(50).fill(0),
            },
          ],
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export const createNewHabits = async uid => {
  var fiftyDaysAgo = new Date();
  fiftyDaysAgo.setDate(fiftyDaysAgo.getDate() - 51);
  await firestore()
    .collection('habits')
    .doc(uid)
    .set({
      Gym: {
        data: [
          {
            date: fiftyDaysAgo.toString(),
            data: Array(50).fill(0),
          },
        ],
      },
    });
};
