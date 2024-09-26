import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SmartScreen from './screens/SmartScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('start'); // start, confirm, game

  const handleRegister = () => {
    setCurrentScreen('confirm');
  };

  const handleConfirm = () => {
    setCurrentScreen('game');
  };

  const handleReset = () => {
    setCurrentScreen('start');
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'start' && (
        <SmartScreen onRegister={handleRegister} />
      )}
      {/* {currentScreen === 'confirm' && (
        <ConfirmScreen onConfirm={handleConfirm} onReset={handleReset} />
      )}
      {currentScreen === 'game' && (
        <GameScreen onReset={handleReset} />
      )} */}
    </View>
  );
};

export default App;
