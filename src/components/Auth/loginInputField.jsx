import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {tableColor} from '../../consts/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const LoginInputField = ({setValue, placeholder, iconName, hidden = false}) => {
  return (
    <View style={styles.textView}>
      <Icon
        name={iconName}
        size={20}
        color={'#444444'}
        style={styles.iconStyle}
      />
      <TextInput
        placeholderTextColor="#444444"
        placeholder={placeholder}
        style={styles.textInput}
        secureTextEntry={hidden}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

export default LoginInputField;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 10,
    width: 300,
  },
  iconStyle: {
    paddingVertical: 10,
    paddingLeft: 5,
  },
  textView: {
    width: 300,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    fontWeight: '500',
    color: 'black',
    marginRight: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});
