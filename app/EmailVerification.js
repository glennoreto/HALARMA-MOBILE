import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../assets/styles/EmailVerificationStyles';

const EmailVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { email, otp: initialOtp } = route.params;
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otp, setOtp] = useState(initialOtp);
  const [resendTimer, setResendTimer] = useState(30);  // Initial countdown time
  const [isResendDisabled, setIsResendDisabled] = useState(true);  // Resend button disabled initially

  // Countdown timer for the resend button
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Verify OTP function
  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      Alert.alert('Success', 'OTP verified successfully!');
      navigation.navigate('Accounts');  // Navigate to next screen after verification
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  // Resend OTP function with countdown timer reset
  const handleResendOtp = async () => {
    if (isResendDisabled) return;

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);                // Set the new OTP
    setResendTimer(30);            // Reset timer
    setIsResendDisabled(true);      // Disable resend button

    console.log('New OTP:', newOtp);  // Log new OTP for testing/debugging
    Alert.alert('OTP Sent', 'A new OTP has been sent to your email.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>EMAIL VERIFICATION</Text>
      <Text style={styles.subtitle}>
        We sent a confirmation code to the email address you provided: {email}
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter code:"
          keyboardType="numeric"
          value={enteredOtp}
          onChangeText={setEnteredOtp}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleVerifyOtp}>
          <Text style={styles.sendButtonText}>Verify Code</Text>
        </TouchableOpacity>

        <Text style={styles.resendText}>Didn't receive the code?</Text>
        <TouchableOpacity
          style={[styles.resendContainer, isResendDisabled ? styles.disabledButton : null]}
          onPress={handleResendOtp}
          disabled={isResendDisabled}
        >
          <Text style={styles.resendLink}>
            {isResendDisabled ? `Resend Code in ${resendTimer}s` : 'Resend Code'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailVerification;
