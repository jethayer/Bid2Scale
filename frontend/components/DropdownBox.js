import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../core/theme';

const DropdownBox = ({ inputKeywords, setKeywords }) => {

  const handleValueChange = (value) => {
    setKeywords(value);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={inputKeywords}
        onValueChange={handleValueChange}
        style={styles.dropdown}
      >
        <Picker.Item label="Business Operations" value="Business Operations" />
        <Picker.Item label="Construction" value="Construction" />
        <Picker.Item label="Finance" value="Finance" />
        <Picker.Item label="Healthcare" value="Healthcare" />
        <Picker.Item label="Marketing" value="Marketing" />
        <Picker.Item label="Technology" value="Technology" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});

export default DropdownBox;