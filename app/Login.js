import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Use useRouter for navigation
import { supabase } from './lib/supabase'; // Supabase client
import styles from '../assets/styles/LoginStyles'; // Import your styles
import Icon from 'react-native-vector-icons/Feather'; // For the back arrow icon

// Function to simulate sending OTP (replace with real service in production)
const sendEmailOTP = async (email, otp) => {
  console.log(`Sending OTP ${otp} to ${email}`);
  // Simulate sending OTP (replace with actual API call)
  return true; 
};

const Login = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to generate and send OTP
  const generateAndSendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp); // For debugging
    await sendEmailOTP(email, otp); // Simulate sending the OTP via email
    return otp;
  };

  const handleLoginPress = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Error', error.message);
      } else {
        // Generate OTP after successful login
        const otp = await generateAndSendOTP(email);
        Alert.alert('Login Successful', 'An OTP has been sent to your email.');

        // Navigate to the OTP verification screen and pass OTP and email
        router.push({ pathname: '/TwoFactorAuth', params: { email, otp } });
      }
    } catch (err) {
      console.error('Error during login:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordPress = () => {
    // Navigate to the NewPasswordReset screen
    router.push('/NewPasswordReset');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.subtitle}>Simplify, Inform, Empower: Your Information Solution.</Text>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button with OTP logic */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress} disabled={loading}>
          <Text style={styles.loginButtonText}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={styles.footerLinks}>
          <Text style={styles.footerText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/Signup')}>
            <Text style={styles.link}>Sign-up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResetPasswordPress}>
            <Text style={styles.link}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
