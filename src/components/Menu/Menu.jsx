import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/dist/Entypo';
import auth from '@react-native-firebase/auth';

const EditMenu = ({editItems}) => {
  const logout = () => {
    auth().signOut();
  };
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon name="dots-three-vertical" size={20} color={'white'} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={editItems} text="Edit" />
          <MenuOption onSelect={logout}>
            <Text style={{color: 'red'}}>Logout</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default EditMenu;

const styles = StyleSheet.create({});
