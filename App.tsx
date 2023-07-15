/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/components/Display habits/homeScreen';
import SettingsScreen from './src/components/Settings/settingsScreen';
import SignUpScreen from './src/components/Auth/SignUpScreen';
import PrivacyPolicyScreen from './src/components/Settings/privacyPolicy';
import TermsAndConditionsScreen from './src/components/Auth/termsAndConditions';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Signup"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Terms"
          component={TermsAndConditionsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
