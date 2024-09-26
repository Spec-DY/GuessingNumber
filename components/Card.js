import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../color';

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: color.cardBackground,
    padding: 20,
    borderRadius: 10,
    shadowColor: color.shadowColor,
    elevation: 5, 
    justifyContent: 'center',
  },
});

export default Card;
