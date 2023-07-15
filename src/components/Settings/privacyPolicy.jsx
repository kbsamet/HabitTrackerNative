import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const PrivacyPolicyScreen = () => {
  return (
    <WebView
      source={{
        uri: 'https://doc-hosting.flycricket.io/easy-habit-tracker-privacy-policy/14245fb8-479a-4c14-8ca6-c3cf97997bc6/privacy',
      }}
      style={{marginTop: 20}}
    />
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({});
