import {
  LayoutAnimation,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {habitColors, tableColor} from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';

const DateBox = ({
  text,
  onEdge,
  setExpandedNoteIndex,
  index,
  expandedNoteIndex,
  scrollToTop,
}) => {
  const onPress = () => {
    if (onEdge) {
      scrollToTop();
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedNoteIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        ...styles.box,
        borderTopLeftRadius: onEdge ? 10 : 0,
        borderBottomWidth: expandedNoteIndex === index ? 0 : 1,
      }}>
      <Text
        style={{
          ...styles.text,
          color: expandedNoteIndex == index ? habitColors[1] : 'white',
        }}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default DateBox;

const styles = StyleSheet.create({
  box: {
    width: 75,
    height: 60,
    backgroundColor: tableColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
