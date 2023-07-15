import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {backgroundColors, habitColors} from '../../consts/colors';
import LoginInputField from './loginInputField';
import {signInEmail, signUpEmail} from '../../services/userService';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSignUpPress = async () => {
    try {
      if (email === '' || password === '' || confirmPassword === '') {
        setErrorMessage('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      await signUpEmail(email, password);
      navigator.navigate('Home');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Weak password');
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Animated.Image
          source={require('../../assets/icon.png')}
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center',
            borderRadius: 10,
            marginBottom: 30,
          }}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.header}>{'Welcome to Habit Tracker '}</Text>
          <View style={styles.loginField}>
            <Text style={styles.text}>Email</Text>
            <LoginInputField
              placeholder={'Email'}
              iconName={'person'}
              setValue={setEmail}
            />
            <Text style={styles.text}>Password</Text>
            <LoginInputField
              placeholder={'Password'}
              iconName={'lock-closed'}
              setValue={setPassword}
              hidden={true}
            />
            <Text style={styles.text}>Confirm Password</Text>
            <LoginInputField
              placeholder={'Confirm Password'}
              iconName={'lock-closed'}
              setValue={setConfirmPassword}
              hidden={true}
            />
            {errorMessage !== '' && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            <View style={{alignItems: 'center'}}>
              <TouchableHighlight
                style={styles.loginButton}
                onPress={onSignUpPress}>
                <Text style={styles.text}>Sign Up</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.h2}>Already have an account? </Text>
              <TouchableHighlight onPress={() => navigator.navigate('Home')}>
                <Text style={styles.signUpButton}> Login</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={styles.h3}>
                By clicking signup you are agreeing to our
              </Text>
              <TouchableHighlight onPress={() => navigator.navigate('Terms')}>
                <Text style={styles.termsButton}> Terms And Conditions</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: backgroundColors[0],
    flex: 1,
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    color: habitColors[2],
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
    marginBottom: 5,
  },
  loginField: {
    marginBottom: 10,
  },
  h2: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  signUpButton: {
    fontSize: 15,
    fontWeight: '400',
    color: habitColors[2],
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  h3: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  termsButton: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: 250,
    height: 40,
    backgroundColor: habitColors[3],
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 15,
    fontWeight: '500',
    color: '#d93434',
    textAlign: 'center',
    marginTop: 5,
  },
});
