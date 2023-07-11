import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {backgroundColors} from '../../consts/colors';
import SettingsButton from './settingsButton';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const backgroundColor = backgroundColors[new Date().getDay()];
  return (
    <View style={{...styles.container, backgroundColor: backgroundColor}}>
      <Icon
        name="arrowleft"
        style={styles.iconStyle}
        size={25}
        color={'white'}
        onPress={() => navigation.goBack()}
      />
      <SettingsButton
        text={'Logout'}
        onPress={() => {
          firebase.auth().signOut();
          navigation.goBack();
        }}
      />
      <SettingsButton text={'Delete Account'} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  iconStyle: {
    marginBottom: 30,
    marginLeft: 4,
  },
});
