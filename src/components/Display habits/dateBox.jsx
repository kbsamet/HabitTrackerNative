import {
  LayoutAnimation,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {tableColor} from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';

const DateBox = ({
  text,
  onEdge,
  setExpandedNoteIndex,
  index,
  expandedNoteIndex,
}) => {
  const onPress = () => {
    if (index == null) {
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedNoteIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <LinearGradient
      colors={
        expandedNoteIndex === index && !onEdge
          ? [tableColor, tableColor]
          : [tableColor, tableColor]
      }
      style={styles.linearGradient}>
      <TouchableHighlight
        onPress={onPress}
        style={{
          ...styles.box,
          borderTopLeftRadius: onEdge ? 10 : 0,
          borderBottomWidth: expandedNoteIndex === index ? 0 : 1,
        }}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    </LinearGradient>
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
  linearGradient: {
    width: 75,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
