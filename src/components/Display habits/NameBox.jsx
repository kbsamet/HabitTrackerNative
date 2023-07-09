import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {deleteHabit} from '../../services/habitService';
import {tableColor} from '../../consts/colors';

const NameBox = ({
  text,
  editMode,
  onDeleteHabit,
  onMoveHabit,
  onEdge,
  isLandscape,
}) => {
  return (
    <View
      style={{
        ...styles.box,
        backgroundColor: tableColor,
        borderTopEndRadius: onEdge ? 10 : 0,
        width: isLandscape ? 150 : 100,
      }}>
      <Text style={styles.text}>{text}</Text>
      {editMode && (
        <View style={styles.iconView}>
          <Icon
            name="arrow-left"
            size={20}
            color={'#dddddd'}
            onPress={() => onMoveHabit(text, -1)}
          />
          <Icon
            name="trash"
            size={20}
            color={'#d90909'}
            onPress={onDeleteHabit}
          />
          <Icon
            name="arrow-right"
            size={20}
            color={'#dddddd'}
            onPress={() => onMoveHabit(text, 1)}
          />
        </View>
      )}
    </View>
  );
};

export default NameBox;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
