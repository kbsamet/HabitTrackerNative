import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {deleteHabit} from '../../services/habitService';
import {tableColor} from '../../consts/colors';
import Dialog from 'react-native-dialog';

const NameBox = ({
  text,
  editMode,
  onDeleteHabit,
  onMoveHabit,
  onEdge,
  isLandscape,
  setEditMode,
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const onDeletePress = () => {
    setIsDialogVisible(true);
  };

  const handleDeleteConfirm = () => {
    setIsDialogVisible(false);
    console.log(isDialogVisible);
    onDeleteHabit();
  };

  return (
    <TouchableHighlight
      onLongPress={() => {
        setEditMode(true);
      }}
      style={{
        ...styles.box,
        backgroundColor: tableColor,
        borderTopEndRadius: onEdge ? 10 : 0,
        width: isLandscape ? 150 : 100,
      }}>
      <View>
        {editMode ? (
          <View style={styles.editView}>
            <View style={styles.iconView}>
              <Icon
                name="arrow-left"
                size={20}
                color={'#dddddd'}
                onPress={() => onMoveHabit(text, -1)}
              />
              <Text style={styles.text}>{text}</Text>
              <Icon
                name="arrow-right"
                size={20}
                color={'#dddddd'}
                onPress={() => onMoveHabit(text, 1)}
              />
            </View>
            <Icon
              name="trash"
              size={20}
              color={'#d90909'}
              onPress={onDeletePress}
            />
          </View>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}

        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Habit Deletion</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete {text} ?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setIsDialogVisible(false);
            }}
          />
          <Dialog.Button
            label="Yes"
            color={'#d90909'}
            onPress={() => {
              handleDeleteConfirm();
            }}
          />
        </Dialog.Container>
      </View>
    </TouchableHighlight>
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
    paddingBottom: 5,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  editView: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
});
