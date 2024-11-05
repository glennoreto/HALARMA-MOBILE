// PasswordReset.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/styles/NewPasswordResetStyles';
import Icon from 'react-native-vector-icons/Feather';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSubmitPress = async () => {
    try {
      // Use Supabase Auth to initiate the password reset process
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        Alert.alert('Error', 'This email is not registered or an error occurred. Please check and try again.');
        return;
      }

      // If email exists and reset process started, generate OTP manually
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await AsyncStorage.setItem('generatedOtp', generatedOtp); // Store OTP for verification
      await AsyncStorage.setItem('resetEmail', email); // Store email for reference in password reset
      console.log('Generated OTP:', generatedOtp); // For debugging

      Alert.alert('OTP Sent', 'An OTP has been sent to your email for password reset.');
      navigation.navigate('ResetPassword', { email }); // Navigate to OTP verification screen
    } catch (error) {
      console.error('Error during email verification:', error);
      Alert.alert('Error', 'An error occurred while processing your request.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Password Reset</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email:"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
          <Text style={styles.submitButtonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordReset;
