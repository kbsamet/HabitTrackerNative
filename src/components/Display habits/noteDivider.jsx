import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {tableColor} from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';

const NoteDivider = ({expanded}) => {
  return (
    expanded && (
      <View style={styles.container}>
        <LinearGradient
          colors={[tableColor, '#444444']}
          style={styles.linerGradient}
        />
      </View>
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
