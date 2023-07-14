import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {tableColor} from '../../consts/colors';

const AddHabitForm = ({addHabit}) => {
  const [habitName, setHabitName] = useState('');

  return (
    <View style={styles.form}>
      <TextInput
        placeholderTextColor="#999999"
        placeholder="Enter Habit name"
        style={styles.textInput}
        value={habitName}
        onChangeText={name => setHabitName(name)}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          if (habitName === '') {
            return;
          }
          addHabit(habitName);
          setHabitName('');
        }}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
};

export default AddHabitForm;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  textInput: {
    padding: 10,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    color: 'white',
    marginRight: 10,
    backgroundColor: tableColor,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: tableColor,
  },
  buttonText: {
    color: '#ffffff',
  },
});
