import {
  Animated,
  Button,
  Easing,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import LoginInputField from './loginInputField';
import {habitColors} from '../../consts/colors';
import {signInEmail, signInGoogle} from '../../services/userService';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
  const navigator = useNavigation();

  const [expanded, setExpanded] = useState(false);
  const [_animatedValue] = useState(new Animated.Value(1));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const onLoginPress = async () => {
    try {
      await signInEmail(email, password);
    } catch (error) {
      console.log(error);
      setShowErrorMessage(true);
    }
  };

  function onGoogleButtonPress() {
    Animated.timing(_animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    LayoutAnimation.configureNext(
      LayoutAnimation.create(500, 'easeInEaseOut', 'scaleXY'),
    );
    setExpanded(true);
    setTimeout(signInWithGoogle, 500);
  }

  async function signInWithGoogle() {
    try {
      signInGoogle();
    } catch (error) {
      console.log(error);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(500, 'easeInEaseOut', 'scaleXY'),
      );
      setExpanded(false);
      Animated.timing(_animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={{marginTop: expanded ? 0 : 100}}>
        <Animated.Image
          source={require('../../assets/icon.png')}
          style={{
            width: 150,
            height: 150,
            opacity: _animatedValue,
            alignSelf: 'center',
            borderRadius: 10,
            marginBottom: 10,
            transform: [
              {
                scale: _animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
        />
        <View
          style={{
            ...styles.loginContainer,
            marginTop: expanded ? 0 : 50,
          }}>
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

            {showErrorMessage && (
              <Text style={styles.errorMessage}>
                Incorrect mail or password
              </Text>
            )}
            <View style={{alignItems: 'center'}}>
              <TouchableHighlight
                style={styles.loginButton}
                onPress={onLoginPress}>
                <Text style={styles.text}>Login</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.h2}>Don't have an account? </Text>
              <TouchableHighlight onPress={() => navigator.navigate('Signup')}>
                <Text style={styles.signUpButton}> Sign Up</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                paddingTop: 10,
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                marginBottom: 5,
              }}
            />
            <Text style={styles.h2}>Or</Text>
          </View>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleButtonPress}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
