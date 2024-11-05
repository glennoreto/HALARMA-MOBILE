import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/styles/ResetPasswordStyles';
import Icon from 'react-native-vector-icons/Feather';

const ResetPassword = () => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const router = useRouter(); // Initialize the router

  const handleSubmitPress = async () => {
    try {
      const storedOtp = await AsyncStorage.getItem('generatedOtp');

      if (enteredOtp === storedOtp) {
        Alert.alert('OTP Verified', 'You can now reset your password.');
        router.push('/ResetSubmit'); // Navigate to ResetSubmit screen
      } else {
        Alert.alert('Invalid OTP', 'The code you entered is incorrect.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while verifying the OTP.');
      console.error('Error accessing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Password Reset</Text>
      <Text style={styles.subtitle}>A verification code has been sent to your email.</Text>

      {/* OTP Input and Submit Button */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Code:"
          keyboardType="numeric"
          value={enteredOtp}
          onChangeText={setEnteredOtp}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
