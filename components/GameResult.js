import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

const GameResult = ({ attemptsUsed, chosenNumber, onNewGame, isGameOver, gameOverReason }) => {

    useEffect(() => {
        console.log(gameOverReason);
      }, [gameOverReason]);
    return (
        <Card>
        {isGameOver ? (
            // Game Over Layout
            <View style={styles.resultContainer}>
            <Text style={styles.instructions}>The game is over</Text>
            <Text>Attempts used: {attemptsUsed}</Text>
            <Image
                source={require('../assets/sadface.jpg')}
                style={styles.image}
            />
            {gameOverReason === 'timer' && (
                <Text style={styles.gameOverReason}>You ran out of time!</Text>
            )}
            {gameOverReason === 'attempts' && (
                <Text style={styles.gameOverReason}>You ran out of attempts!</Text>
            )}
            <CustomButton title="New Game" onPress={onNewGame} />
            </View>
        ) : (
            // Success Layout
            <View style={styles.resultContainer}>
            <Text style={styles.instructions}>
                Congratulations! You guessed the number in {attemptsUsed} attempts!</Text>
            <Image
                source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
                style={styles.image}
            />
            <CustomButton title="New Game" onPress={onNewGame} />
            </View>
        )}
        </Card>
  );
};

const styles = StyleSheet.create({
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 5,
    marginBottom: 20
  },
  gameOverReason: {
    fontSize: 16,
    marginTop: 10,
    color: 'red',
  },
  resultContainer: {
    alignItems:'center'
  }
});

export default GameResult;
