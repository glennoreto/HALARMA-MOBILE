// app/Announcements.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons
import styles from '../assets/styles/AnnouncementsStyles'; // Import styles
import { supabase } from './lib/supabaseClient'; // Import the Supabase client

const Announcements = () => {
  const router = useRouter(); // Initialize the router
  const [announcements, setAnnouncements] = useState([]); // State to hold announcements
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        let { data, error } = await supabase.from('announcements').select('*');
        if (error) {
          console.error('Error fetching announcements:', error);
        } else {
          console.log('Fetched data:', data); // Log data to verify it's being fetched
          setAnnouncements(data);
        }
      } catch (error) {
        console.error('Supabase fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Commenting out the fetch to use hardcoded data for testing
    // fetchAnnouncements();

    // Hardcoded data for testing
    setAnnouncements([
      {
        id: 1,
        created_at: '2024-11-05T07:02:14.000Z',
        title: 'Sample Announcement',
        description: 'Testing testing',
        image: 'https://www.washingtonpost.com/resizer/6R9BjZqhtgmAFn5vKP5M6On_B2o=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ITGJUM2PPNAB5AGCYPOBEDHZNQ.png', // Replace with a valid image URL for testing
      }
    ]);
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ANNOUNCEMENTS</Text>
        <Text style={styles.subtitle}>Stay Informed, Healthy, & Safe</Text>
        <View style={styles.separator} />
      </View>

      {/* Announcements List */}
      <ScrollView contentContainerStyle={styles.announcementContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          announcements.length > 0 ? (
            announcements.map((announcement) => (
              <View key={announcement.id} style={styles.announcementItem}>
                <Text style={styles.announcementOffice}>MSEUF Health and Safety Office</Text>
                <Text style={styles.announcementTime}>
                  {announcement.created_at ? new Date(announcement.created_at).toLocaleString() : 'Unknown time'}
                </Text>
                <Text style={styles.announcementText}>{announcement.description}</Text>
                {announcement.image && (
                  <Image source={{ uri: announcement.image }} style={styles.announcementImage} />
                )}
                <Text style={styles.announcementLink}>N/A</Text>
                <View style={styles.separator} />
              </View>
            ))
          ) : (
            <Text>No announcements available</Text> // Fallback if no data
          )
        )}
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

export default Announcements;
