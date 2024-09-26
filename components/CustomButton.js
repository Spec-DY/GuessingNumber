import React from 'react';
import { Button, View } from 'react-native';

const CustomButton = ({ title, onPress, disabled = false }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Button title={title} onPress={onPress} disabled={disabled} />
    </View>
  );
};

export default CustomButton;
