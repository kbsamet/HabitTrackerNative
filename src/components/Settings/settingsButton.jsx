import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';

const SettingsButton = ({text, onPress}) => {
  return (
    <TouchableHighlight style={styles.buttonStyle} onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableHighlight>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  textStyle: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 10,
    color: '#d90909',
  },
});
