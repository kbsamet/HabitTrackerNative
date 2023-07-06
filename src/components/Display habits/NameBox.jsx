import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {deleteHabit} from '../../services/habitService';
import {tableColor} from '../../consts/colors';

const NameBox = ({text, editMode, onDeleteHabit, onEdge}) => {
  return (
    <View
      style={{
        ...styles.box,
        backgroundColor: tableColor,
        borderTopEndRadius: onEdge ? 10 : 0,
      }}>
      {editMode ? (
        <Icon
          name="trash"
          size={20}
          color={'#d90909'}
          onPress={onDeleteHabit}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
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
