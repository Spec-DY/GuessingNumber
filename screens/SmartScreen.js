import React, { useState } from 'react';
import { SafeAreaView, View, Alert, StyleSheet,Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Card from '../components/Card';
import InputField from '../components/InputField';
import ErrorText from '../components/ErrorText';
import CustomButton from '../components/CustomButton';
import color from '../color';

const SmartScreen = ({  onRegister, name: initialName, email: initialEmail, phone: initialPhone, isCheckboxChecked: initialChecked }) => {
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [phone, setPhone] = useState(initialPhone || '');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(initialChecked || false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (value) => {
    if (!isNaN(value) || value.length <= 1) {
      setNameError('Name must be non-numeric and more than 1 character.');
    } else {
      setNameError('');
    }
    setName(value);
  };


  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
    setEmail(value);
  };


  const validatePhone = (value) => {
    const lastDigit = value[value.length - 1];
    if (isNaN(value) || value.length !== 10 || lastDigit === '0' || lastDigit === '1') {
      setPhoneError('Phone number must be 10 digits and the last digit cannot be 0 or 1.');
    } else {
      setPhoneError('');
    }
    setPhone(value);
  };


  const handleRegister = () => {
    if (!nameError && !emailError && !phoneError && name && email && phone) {
      onRegister(name, email, phone, isCheckboxChecked);
    } else {
      Alert.alert('Invalid', 'Please enter valid information.');
    }
  };


  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsCheckboxChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize:30}}>Welcome</Text>
      </View>
      <Card>
        <InputField
          placeholder="Enter your name"
          value={name}
          onChangeText={validateName}
        />
        <ErrorText errorMessage={nameError} />

        <InputField
          placeholder="Enter your email"
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
        />
        <ErrorText errorMessage={emailError} />

        <InputField
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={validatePhone}
          keyboardType="numeric"
          maxLength={10}
        />
        <ErrorText errorMessage={phoneError} />

        <BouncyCheckbox
          isChecked={isCheckboxChecked}
          onPress={(isChecked) => setIsCheckboxChecked(isChecked)}
          fillColor="blue"
          text="I agree to privacy terms"
          textStyle={{ textDecorationLine: 'none' }}
          style={{ marginVertical: 5, paddingVertical: 5 }}
        />

        <View style={styles.buttonContainer}>
          <CustomButton title="Reset" onPress={handleReset} />
          <CustomButton title="Register" onPress={handleRegister} disabled={!isCheckboxChecked} />
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.mainBackground,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  header:{
    alignItems:'center',
    position: 'absolute',
    top: 130,
  }
});

export default SmartScreen;
