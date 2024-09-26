import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorText = ({ errorMessage }) => {
  return errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ErrorText;
