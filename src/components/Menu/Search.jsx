import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Octicons';
import DatePicker from 'react-native-date-picker';
import {daysIntoYear} from '../../consts/date';

const Search = ({onPress}) => {
  const [open, setOpen] = useState(false);

  const onSearchPress = date => {
    onPress(daysIntoYear(new Date()) - daysIntoYear(date));
  };

  return (
    <View>
      <TouchableHighlight onPress={() => setOpen(true)}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="search" size={22} color={'white'} />
        </View>
      </TouchableHighlight>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        maximumDate={new Date()}
        minimumDate={new Date(new Date().getFullYear(), 1, 1)}
        mode="date"
        confirmText="Go"
        onConfirm={date => {
          onSearchPress(date);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
