import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // For navigation and route params
import styles from '../assets/styles/LoginStyles';

const VerifyOTP = () => {
  const router = useRouter();
  const { email, otp } = useLocalSearchParams(); // Get email and OTP from route params
  const [inputOtp, setInputOtp] = useState('');

  const handleVerifyOTP = () => {
    if (inputOtp === otp) {
      Alert.alert('Success', 'OTP verified. Proceed to change your password.');
      router.push({ pathname: '/ChangeP', params: { email } });
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.instructions}>Enter the OTP sent to your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={inputOtp}
        onChangeText={setInputOtp}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleVerifyOTP}>
        <Text style={styles.loginButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOTP;
