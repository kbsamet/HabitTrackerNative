import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const createNewNotes = async uid => {
  var res = await firestore().collection('habits').doc(uid).get();
  var habits = res.data();
  var year = new Date().getFullYear();
  Object.entries(habits).forEach(([key, value]) => {
    habits[key].notes = {
      [year]: Array(365).fill(''),
    };
  });
  await firestore().collection('habits').doc(uid).set(habits);
};

export const getNotes = async uid => {
  try {
    var res = await firestore().collection('habits').doc(uid).get();
    var habits = res.data();
    var year = new Date().getFullYear();
    var notes = {};
    Object.entries(habits).forEach(([key, value]) => {
      notes[key] = habits[key].notes[year];
    });
    return notes;
  } catch (error) {
    console.log(error);
  }
};

export const addNote = async (habitName, index, note) => {
  try {
    var uid = auth().currentUser.uid;
    var res = await firestore().collection('habits').doc(uid).get();
    var newData = res.data();
    newData[habitName].notes[index[0]][index[1]] = note;
    await firestore().collection('habits').doc(uid).set(newData);
  } catch (error) {
    console.log(error);
  }
};
