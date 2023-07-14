import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {tableColor} from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';

const NoteDivider = ({expanded, setExpandedNoteIndex}) => {
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedNoteIndex(-1);
  };

  return (
    expanded && (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.container}>
          <LinearGradient
            colors={[tableColor, '#444444']}
            style={styles.linerGradient}
          />
        </View>
      </TouchableHighlight>
    )
  );
};

export default NoteDivider;

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 100,
    borderColor: 'white',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  linerGradient: {
    width: 75,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
