import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import {habitColors} from '../../consts/colors';
import {updateHabitState} from '../../services/habitService';

const HabitBox = ({name, index, initialState, isLandscape}) => {
  const [habitState, setHabitState] = useState(initialState);

  const onClick = () => {
    var newState = (habitState + 1) % 4;
    setHabitState(newState);
    updateHabitState(name, index, newState);
  };

  return (
    <TouchableHighlight onPress={onClick} activeOpacity={0.9}>
      <View
        style={{
          ...styles.box,
          backgroundColor: habitColors[habitState],
          width: isLandscape ? 150 : 100,
        }}
      />
    </TouchableHighlight>
  );
};

export default HabitBox;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 60,

    borderWidth: 1,
    borderColor: 'white',
  },
});
