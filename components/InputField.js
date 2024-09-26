import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import color from '../color';

const InputField = ({ placeholder, value, onChangeText, keyboardType = 'default', maxLength }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: color.inputText,
    marginBottom: 10,
    padding: 8,
  },
});

export default InputField;
