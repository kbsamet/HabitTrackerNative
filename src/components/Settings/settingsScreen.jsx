import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {backgroundColors} from '../../consts/colors';
import SettingsButton from './settingsButton';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {deleteAccount} from '../../services/userService';
import Dialog from 'react-native-dialog';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const backgroundColor = backgroundColors[new Date().getDay()];
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleModal = async () => {
    setIsDialogVisible(false);
    await deleteAccount(firebase.auth().currentUser.uid);
    navigation.goBack();
  };

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
      <SettingsButton
        text={'Delete Account'}
        onPress={() => {
          setIsDialogVisible(true);
        }}
      />
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Account Deletion</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete your account ?
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setIsDialogVisible(false);
          }}
        />
        <Dialog.Button
          label="Yes"
          color={'#d90909'}
          onPress={() => {
            handleModal();
          }}
        />
      </Dialog.Container>
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
