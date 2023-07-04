import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{padding: 20, marginTop: 50}}>
      <Button title="Login" onPress={onGoogleButtonPress} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
