import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import Card from '../components/Card';
import color from '../color';
import CustomButton from '../components/CustomButton';
import GuessResult from '../components/GuessResult';
import GameResult from '../components/GameResult';

const GameScreen = ({ phone, chosenNumber, onRestart }) => {
  const [enteredGuess, setEnteredGuess] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false)
  const [guessResult, setGuessResult] = useState(''); // higher, lower, correct
  const [gameOverReason, setGameOverReason] = useState('');  // either timer or attempts

  useEffect(() => {
    console.log({ chosenNumber });
  }, [chosenNumber]);


  // start rules
  const startGame = () => {
    setIsGameStarted(true);
    setAttempts(4);
    setTimeRemaining(60);
    setGuessResult('');
    setIsGameOver(false);
    setGameOverReason('');
  };

  const handleGuess = () => {
    // empty
    if (!enteredGuess) {
        Alert.alert('Invalid Input', 'Please enter a number.');
        return;
      }
    
    const guess = parseFloat(enteredGuess);
    
    // decimal
    if (!Number.isInteger(guess)) {
        Alert.alert('Invalid Input', 'Please enter a valid integer.');
        return;
    }

    if (guess === chosenNumber) {
        setGuessResult('correct');
        setAttempts((prev) => prev - 1);
      } else if (guess < chosenNumber) {
        setGuessResult('higher');
        setAttempts((prev) => prev - 1);
      } else {
        setGuessResult('lower');
        setAttempts((prev) => prev - 1);
      }

    if (attempts - 1 === 0) {
        setIsGameOver(true);
        setGameOverReason('attempts'); // gameover out of attempts
    }
  };

  const handleTryAgain = () => {
    setGuessResult('');
    setEnteredGuess('');
  };

  const handleNewGame = () => {
    onRestart();
  };

  // manual end game
  const handleEndGame = () => {
    setGameOverReason('');
    setIsGameOver(true);
  };

  const handleHint =()=> {
    Alert.alert("Hint", "Correct Answer is:" + chosenNumber);
    return;
  }

  // count down
  useEffect(() => {
    if (isGameStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setIsGameOver(true);
      setGameOverReason('timer');
    }
  }, [isGameStarted, timeRemaining]);



  return (
    <SafeAreaView style={styles.container}>
      {!isGameStarted ? (
        <Card>
          <Text style={styles.instructions}>
            You have 60 seconds and 4 attempts to guess a number that is a multiply of {phone[phone.length - 1]} between 1 and 100.
          </Text>
          <CustomButton title="Start" onPress={startGame} />
        </Card>
        // game over
      ) : isGameOver ? (
        <GameResult
          attemptsUsed={4 - attempts} // Calculate attempts used directly
          chosenNumber={chosenNumber}
          onNewGame={handleNewGame}
          isGameOver={isGameOver}
          gameOverReason={gameOverReason} // Pass the reason for game over
        />
        // guessed corrected and game finish
      ) : guessResult === 'correct' ? (
        <GameResult
          attemptsUsed={4 - attempts}
          chosenNumber={chosenNumber}
          onNewGame={handleNewGame}
          isGameOver={false}
        />
        // render while game not over yet
      ) : guessResult ? (
        <GuessResult
          guessResult={guessResult}
          onTryAgain={handleTryAgain}
          onEndGame={handleEndGame}
        />
      ) : (
        <View>
            <View style={styles.restartButton}>
                <Button title="Restart" onPress={onRestart} color="red" />
            </View>
            <Card>
                <View style={styles.header}>
                    <Text style={styles.timer}>Time remaining: {timeRemaining} seconds</Text>
                    <Text style={styles.attempts}>Attempts left: {attempts}</Text>
                </View>
                <Text style={styles.label}>Guess a number between 1 to 100 that is multiply of {phone[phone.length - 1]}</Text>
                <TextInput
                style={styles.input}
                value={enteredGuess}
                onChangeText={setEnteredGuess}
                keyboardType="numeric"
                placeholder="Enter a number"
                />
                <View style={{flexDirection:'row', justifyContent:'space-evenly', padding:10}}>
                    <CustomButton title="hint" onPress={handleHint} />
                    <View style={{margin:20}}></View>
                    <CustomButton title="Submit Guess" onPress={handleGuess} />
                </View>
            </Card>
        </View>
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
    marginBottom: 20
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  timer: {
    fontSize: 14,
    color: 'red',
  },
  attempts: {
    fontSize: 14,
    color: 'red',
  },
  label:{
    textAlign: 'center'
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 5,
    fontSize: 18,
    width: 150,
    alignSelf:'center'
  },
  restartButton:{
    alignSelf:'flex-end',
    paddingRight:20,
    paddingBottom:10
  }
});

export default GameScreen;
