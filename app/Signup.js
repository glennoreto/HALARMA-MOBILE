import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Icon from 'react-native-vector-icons/Feather'; // Import the Feather icons
import { supabase } from './lib/supabase'; // Supabase client
import styles from '../assets/styles/SignupStyles'; // Import your styles

const Signup = () => {
  const router = useRouter(); // Initialize the router for navigation

  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to generate and send OTP for email verification
  const generateAndSendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    // Here you would send the OTP via email using an external service or Supabase email trigger
    console.log('Generated OTP:', otp); // This is for testing/debugging purposes
    // You can replace this with real email-sending functionality
    return otp;
  };

  const handleSignUpPress = async () => {
    if (!email || !id || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    // Call Supabase signUp
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Sign-Up Error', error.message);
    } else {
      // Generate OTP after successful sign-up
      const otp = await generateAndSendOTP(email);
      Alert.alert('Success', 'Check your email for the verification code.');

      // Navigate to the email verification screen and pass the email and OTP
      router.push({ pathname: '/EmailVerification', params: { email, otp } });
    }

    setLoading(false);
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

      {/* Title */}
      <Text style={styles.title}>SIGN UP</Text>
      <Text style={styles.subtitle}>Simplify, Inform, Empower: Your Information Solution.</Text>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Sign-up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUpPress} disabled={loading}>
        <Text style={styles.signupButtonText}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Footer Links */}
      <View style={styles.footerLinks}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
