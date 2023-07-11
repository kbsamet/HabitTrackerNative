import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/dist/Entypo';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const EditMenu = () => {
  const navigation = useNavigation();
  const onMenuPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <View>
      <TouchableHighlight onPress={onMenuPress}>
        <Icon name="dots-three-vertical" size={20} color={'white'} />
      </TouchableHighlight>
    </View>
  );
};

export default EditMenu;

const styles = StyleSheet.create({});
