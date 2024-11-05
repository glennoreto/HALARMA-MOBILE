import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Use hooks for route and navigation
import styles from '../assets/styles/TwoFactorAuthStyles'; // Import the separated styles

const TwoFactorAuth = () => {
  const route = useRoute(); // Hook to get route params
  const navigation = useNavigation();
  const { email, otp } = route.params; // Extract email and OTP from route params
  const [code, setCode] = useState('');

  // Function to handle OTP verification
  const handleVerifyCode = () => {
    if (Array.isArray(otp) ? otp.includes(code) : code === otp) {
      Alert.alert('Success', 'OTP Verified!');
      console.log(`OTP verification successful for email: ${email}`); // Log success in terminal
      navigation.navigate('Homepages'); // Navigate to the homepage after successful OTP verification
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      console.log(`Invalid OTP entered for email: ${email}`); // Log invalid attempt in terminal
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.subtitle}>2 FACTOR AUTHENTICATION</Text>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Please enter the code we sent to {email}
      </Text>

      {/* OTP Input and Verify Button */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Code"
          keyboardType="numeric"
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleVerifyCode}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TwoFactorAuth;
