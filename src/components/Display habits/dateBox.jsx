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
import Icon from 'react-native-vector-icons/dist/Ionicons';

const DateBox = ({
  text,
  onEdge,
  setExpandedNoteIndex,
  index,
  expandedNoteIndex,
  scrollToTop,
  setDataSourceCords,
}) => {
  const onLayout = e => {
    if (!setDataSourceCords) {
      return;
    }
    const layout = e.nativeEvent.layout;
    setDataSourceCords(prev => {
      prev[index] = layout.y;
      return prev;
    });
  };

  const onPress = () => {
    if (onEdge) {
      scrollToTop();
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedNoteIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <View onLayout={e => onLayout(e)}>
      <TouchableHighlight
        onPress={onPress}
        style={{
          ...styles.box,
          borderTopLeftRadius: onEdge ? 10 : 0,
          borderBottomWidth: expandedNoteIndex === index ? 0 : 1,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              ...styles.text,
              color: expandedNoteIndex == index ? habitColors[1] : 'white',
            }}>
            {text}
          </Text>
          {text === '' && (
            <Icon
              name="ios-arrow-up"
              size={28}
              color={'#cccccc'}
              style={{paddingBottom: 5}}
            />
          )}
        </View>
      </TouchableHighlight>
    </View>
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
