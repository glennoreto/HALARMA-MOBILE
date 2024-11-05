import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // For navigation and route params
import { supabase } from './lib/supabase'; // Supabase client
import styles from '../assets/styles/LoginStyles';

const ChangePass = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Get the email from route params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Error changing password:', error.message);
        Alert.alert('Error', 'Failed to change password. Please try again.');
      } else {
        Alert.alert('Success', 'Password changed successfully. Please log in with your new password.');
        router.push('/Login'); // Navigate back to the login screen
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleChangePassword}>
        <Text style={styles.loginButtonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePass;
