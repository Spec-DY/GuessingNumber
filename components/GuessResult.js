import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

const GuessResult = ({ guessResult, onTryAgain, onEndGame }) => {
  return (
    <Card>
      <Text style={styles.instructions}>Your should guess {guessResult}. Try again!</Text>
      <CustomButton title="Try Again" onPress={onTryAgain} />
      <CustomButton title="End Game" onPress={onEndGame} />
    </Card>
  );
};

const styles = StyleSheet.create({
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default GuessResult;
