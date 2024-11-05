import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray' }}>
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
        component={HomeScreen}
      />
      {/* Notifications Tab */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <FontAwesome name="bell" size={24} color={color} />,
        }}
        component={NotificationsScreen}
      />
      {/* History Tab */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome name="history" size={24} color={color} />,
        }}
        component={HistoryScreen}
      />
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
        component={ProfileScreen}
      />
    </Tabs>
  );
}

// Home Screen Component
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
}

// Notifications Screen Component
function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Notifications</Text>
    </View>
  );
}

// History Screen Component
function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History Log</Text>
    </View>
  );
}

// Profile Screen Component
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
    </View>
  );
}

// Common Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
