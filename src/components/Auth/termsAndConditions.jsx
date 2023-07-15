import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const TermsAndConditionsScreen = () => {
  return (
    <WebView
      source={{
        uri: 'https://doc-hosting.flycricket.io/easy-habit-tracker-terms-of-use/904b43cb-277f-4db6-9916-b7325cb561ee/terms',
      }}
      style={{marginTop: 20}}
    />
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({});
