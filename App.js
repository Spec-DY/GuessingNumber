import React, { useState } from 'react';
import { View,Text,StyleSheet, SafeAreaView } from 'react-native';
import SmartScreen from './screens/SmartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import color from './color';


const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [currentScreen, setCurrentScreen] = useState('start'); // start, confirm, game

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
  };

  const handleGoBack = () => {
    setIsConfirmVisible(false)
  };

  return (
    <>
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
    </>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1
  }

})

export default App;
