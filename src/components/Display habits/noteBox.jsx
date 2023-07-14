import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {tableColor} from '../../consts/colors';
import {addNote} from '../../services/noteService';
const NoteBox = ({expanded, note, habitName, index, isLandscape, onPress}) => {
  var ref = React.createRef();
  const [value, setValue] = React.useState(note);

  const onChange = e => {
    addNote(habitName, index, e.nativeEvent.text);
    setValue(e.nativeEvent.text);
  };

  return (
    expanded && (
      <LinearGradient
        colors={[tableColor, '#444444']}
        style={{...styles.linerGradient, width: isLandscape ? 150 : 100}}>
        <TextInput
          ref={ref}
          onFocus={onPress}
          placeholder="Add Note"
          placeholderTextColor={'#cccccc'}
          value={value}
          style={styles.textInput}
          onChange={e => onChange(e)}
          multiline={true}
        />
      </LinearGradient>
    )
  );
};

export default NoteBox;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,

    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#666666',
  },
  textInput: {
    width: 90,
    height: 90,
    padding: 5,
    margin: 5,
    fontSize: 13,
    color: 'white',
  },
  linerGradient: {
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
