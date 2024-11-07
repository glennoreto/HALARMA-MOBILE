import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide header for each tab
        tabBarStyle: { backgroundColor: '#E0E1E0' }, // Style the tab bar
        tabBarActiveTintColor: '#333', // Active icon color
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="Homepages" // This corresponds to app/Homepages.js
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />

      {/* Notifications Tab */}
      <Tabs.Screen
        name="Notification" // This corresponds to app/Notification.js
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => <Icon name="bell" size={size} color={color} />,
        }}
      />

      {/* History Tab */}
      <Tabs.Screen
        name="History" // This corresponds to app/History.js
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Icon name="history" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
