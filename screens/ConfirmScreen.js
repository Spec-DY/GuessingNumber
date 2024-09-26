import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import color from '../color'
import Card from '../components/Card'

const ConfirmScreen = ({ visible, name, email, phone, isCheckboxChecked, onConfirm, onGoBack }) => {
  return (
    <Modal 
        visible={visible} 
        transparent={true} 
        animationType="slide">
      <LinearGradient
        colors={[color.gradientColor, 'rgba(0,0,0,0)']}
        style={styles.gradientBackground}>
        <Card>
          <Text style={styles.title}>Hello {name}</Text>
              <Text style={styles.text}>You Entered:</Text>
              <Text style={styles.text}>Email Address: {email}</Text>
              <Text style={styles.text}>Phone Number: {phone}</Text>
              <Text style={styles.text}>Privacy Terms Accepted: {isCheckboxChecked ? 'Yes' : 'No'}</Text>
              <Text style={styles.text}>
                  Please click Go Back if incorrect
              </Text>

              <View style={styles.buttonContainer}>
                  <CustomButton title="Go Back" onPress={onGoBack} color="red" />
                  <CustomButton title="Continue" onPress={onConfirm} color="blue" />
              </View>
        </Card>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign:'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default ConfirmScreen;
