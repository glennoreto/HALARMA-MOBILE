import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabase';
import styles from '../assets/styles/LoginStyles';
import Icon from 'react-native-vector-icons/Feather';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to send OTP via Supabase
  const handleSendOTP = async () => {
    try {
      setLoading(true);

      // Check if the email is registered by attempting to sign in with email and password
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        Alert.alert('Error', 'User not registered or incorrect password.');
        return;
      }

      // If user exists, send OTP to the email
      const { error: otpError } = await supabase.auth.signInWithOtp({ email });
      if (otpError) throw otpError;

      Alert.alert('OTP Sent', 'Please check your email for the verification code.');
      router.push({ pathname: '/TwoFactorAuth', params: { email } });
    } catch (err) {
      console.error('Error sending OTP:', err);
      Alert.alert('Error', 'Failed to send OTP. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = async () => {
    if (loading) return;
    await handleSendOTP();
  };

  const handleResetPasswordPress = () => {
    router.push('/NewPasswordReset');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.subtitle}>Simplify, Inform, Empower: Your Information Solution.</Text>

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

        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>

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
