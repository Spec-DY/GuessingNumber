import React, { useState } from 'react';
import { View,Text,StyleSheet, SafeAreaView } from 'react-native';
import SmartScreen from './screens/SmartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import color from './color';
import GameScreen from './screens/GameScreen';


const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [chosenNumber, setChosenNumber] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('start'); // start, game

  const handleRegister = (name, email, phone, isChecked) => {
    setName(name);
    setEmail(email);
    setPhone(phone);
    setIsCheckboxChecked(isChecked);
    setIsConfirmVisible(true);
  };

  const handleConfirm = () => {
    setIsConfirmVisible(false);
    setCurrentScreen('game');
    generateRandomNumber();
  };

  const handleGoBack = () => {
    setIsConfirmVisible(false)
  };

  const handleRestart = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsCheckboxChecked(false);
    setChosenNumber(null);
    setCurrentScreen('start');
  };


  const generateRandomNumber = () => {
    const lastDigit = phone[phone.length - 1];
    const multiples = [];
    for (let i = 1; i <= 100 / lastDigit; i++) {
      multiples.push(lastDigit * i);
    }
    setChosenNumber(multiples[Math.floor(Math.random() * multiples.length)]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'start' && (
        <SmartScreen
          onRegister={handleRegister}
          name={name}
          email={email}
          phone={phone}
          isCheckboxChecked={isCheckboxChecked}
        />
      )}

      <ConfirmScreen
        visible={isConfirmVisible}
        name={name}
        email={email}
        phone={phone}
        isCheckboxChecked={isCheckboxChecked}
        onGoBack={handleGoBack}
        onConfirm={handleConfirm}
      />

      {currentScreen === 'game' && (
        <GameScreen
          phone={phone}
          chosenNumber={chosenNumber}
          onRestart={handleRestart}
        />
      )}
    </SafeAreaView>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1
  }

})

export default App;
