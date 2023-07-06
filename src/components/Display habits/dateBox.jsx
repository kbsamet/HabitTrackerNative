import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {tableColor} from '../../consts/colors';

const DateBox = ({text, onEdge}) => {
  return (
    <View
      style={{
        ...styles.box,
        backgroundColor: tableColor,
        borderTopLeftRadius: onEdge ? 10 : 0,
      }}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default DateBox;

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
