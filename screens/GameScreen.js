import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import Card from '../components/Card';
import color from '../color';

const GameScreen = ({ phone, chosenNumber, onRestart }) => {
  const [enteredGuess, setEnteredGuess] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    console.log({ chosenNumber });
  }, [chosenNumber]);

  const startGame = () => {
    setIsGameStarted(true);
    setAttempts(4);
    setTimeRemaining(60);
  };

  const handleGuess = () => {
    if (!enteredGuess) {
      Alert.alert('Invalid Input', 'Please enter a number.');
      return;
    }

    const guess = parseInt(enteredGuess);

    if (guess === chosenNumber) {
      Alert.alert('Congratulations!', 'You guessed the correct number!');
      onRestart();  // correct
    } else {
      setAttempts((prev) => prev - 1);
      if (attempts - 1 === 0) {
        Alert.alert('Game Over', 'You have no more attempts left.');
        onRestart();  // wrong
      } else {
        Alert.alert('Wrong Guess', `You have ${attempts - 1} attempts left.`);
      }
    }
  };

  // count down
  useEffect(() => {
    if (isGameStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      Alert.alert('Time Up!', 'You ran out of time.');
      onRestart();
    }
  }, [isGameStarted, timeRemaining]);

  return (
    <SafeAreaView style={styles.container}>
      {!isGameStarted ? (
        <Card>
          <Text style={styles.instructions}>
            You have 60 seconds and 4 attempts to guess a number that is a multiple of {phone[phone.length - 1]} between 1 and 100.
          </Text>
          <Button title="Start" onPress={startGame} />
        </Card>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.timer}>Time remaining: {timeRemaining} seconds</Text>
            <Text style={styles.attempts}>Attempts left: {attempts}</Text>
            <Button title="Restart" onPress={onRestart} color="red" />
          </View>
          
          <Card>
            <Text>Enter your guess:</Text>
            <TextInput
              style={styles.input}
              value={enteredGuess}
              onChangeText={setEnteredGuess}
              keyboardType="numeric"
              placeholder="Enter a number"
            />
            <Button title="Submit Guess" onPress={handleGuess} />
          </Card>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mainBackground,
  },
  header: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    color: 'red',
  },
  attempts: {
    fontSize: 18,
    color: 'red',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 5,
    fontSize: 18,
    width: 150,
    textAlign: 'center',
  },
});

export default GameScreen;
