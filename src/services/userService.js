import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const deleteAccount = async uid => {
  try {
    await firestore().collection('habits').doc(uid).delete();
    await firestore().collection('habitOrders').doc(uid).delete();
    await firebase.auth().currentUser.delete();
  } catch (error) {
    console.log(error);
  }
};

export const signInGoogle = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log(googleCredential);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

export const signInEmail = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signUpEmail = async (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};
