import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import {habitColors} from '../../consts/colors';

const HabitBox = () => {
  const [habitState, setHabitState] = useState(0);

  const onClick = () => {
    setHabitState((habitState + 1) % 4);
  };

  return (
    <TouchableHighlight onPressIn={onClick} activeOpacity={0.9}>
      <View style={{...styles.box, backgroundColor: habitColors[habitState]}} />
    </TouchableHighlight>
  );
};

export default HabitBox;

const styles = StyleSheet.create({
  box: {
    width: 75,
    height: 60,

    borderWidth: 1,
    borderColor: 'white',
  },
});
