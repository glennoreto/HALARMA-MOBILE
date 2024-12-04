import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { createClient } from '@supabase/supabase-js'; // Import Supabase client
import styles from '../assets/styles/NotificationStyles'; // Import styles

const Notification = () => {  
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // Initialize Supabase client with debug enabled
  const supabase = createClient('https://bmtrvbxbqdmzfhyotepu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdHJ2YnhicWRtemZoeW90ZXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMzU3MDEsImV4cCI6MjA0NDgxMTcwMX0.87VD2EKn3e57F3kd7_dqQiglGIlcqSlfxfoe0UR_Ulo', {
    debug: true, // Enable debug logs
  });

  // Fetch notifications from Supabase
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log('Fetching notifications...');
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('time', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching notifications:', error);
        } else {
          setNotifications(data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Network Error:', err);
      }
    };

    // Create notifications table if it doesn't exist
    const createNotificationsTable = async () => {
      try {
        // Table schema for notifications
        const { error } = await supabase.rpc('create_notifications_table');
        if (error) {
          console.error('Error creating table:', error);
        } else {
          console.log('Notifications table created successfully');
        }
      } catch (err) {
        console.error('Error creating notifications table:', err);
      }
    };

    // Create trigger for notifications
    const createTrigger = async () => {
      try {
        const { error } = await supabase.rpc('create_notification_trigger');
        if (error) {
          console.error('Error creating trigger:', error);
        } else {
          console.log('Trigger created successfully');
        }
      } catch (err) {
        console.error('Error creating trigger:', err);
      }
    };

    // Create table and trigger only once
    createNotificationsTable();
    createTrigger();

    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.separator} />
      </View>

      {/* Error Message */}
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.notificationContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={[styles.notificationItem, { backgroundColor: notification.color }]}>
            <View style={styles.notificationIconCircle}>
              <Icon name="bell" size={24} color="#fff" />
            </View>
            <View style={styles.notificationText}>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{new Date(notification.time).toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Homepages')}>
          <Icon name="home" size={25} color="#333" style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Notification')}>
          <Icon name="bell" size={25} color="#333" style={styles.navIcon} />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/History')}>
          <Icon name="history" size={25} color="#333" style={styles.navIcon} />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Profile')}>
          <Icon name="user" size={25} color="#333" style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notification;
