import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

const GuessResult = ({ guessResult, onTryAgain, onEndGame }) => {
  return (
    <Card>
      <Text style={styles.instructions}>Your should guess {guessResult}. Try again!</Text>
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <CustomButton title="End Game" onPress={onEndGame} />
        <View style={{margin:20}}></View>
        <CustomButton title="Try Again" onPress={onTryAgain} />
      </View>
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
