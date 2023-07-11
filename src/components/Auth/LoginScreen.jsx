import {
  Button,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [expanded, setExpanded] = useState(false);

  function onGoogleButtonPress() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(500, 'easeInEaseOut', 'opacity'),
    );
    setExpanded(true);
    setTimeout(signIn, 500);
  }

  async function signIn() {
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
      LayoutAnimation.configureNext(
        LayoutAnimation.create(500, 'easeInEaseOut', 'opacity'),
      );
      setExpanded(false);
    }
  }

  return (
    <View style={{marginTop: expanded ? 0 : 200}}>
      <Text style={styles.header}>{expanded ? '' : 'Habit Tracker'}</Text>
      <View
        style={{
          ...styles.loginContainer,
          marginTop: expanded ? 0 : 50,
        }}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 25,
    width: '100%',
    padding: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  loginContainer: {
    paddingTop: 50,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: '100%',
    width: '100%',
    backgroundColor: '#333333',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
