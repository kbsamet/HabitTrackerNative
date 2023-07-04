import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NameBox = ({text}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default NameBox;

const styles = StyleSheet.create({
  box: {
    width: 75,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
