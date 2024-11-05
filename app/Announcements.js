import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons
import styles from '../assets/styles/AnnouncementsStyles'; // Import styles

const Announcements = () => {
  const router = useRouter(); // Initialize the router

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
        {/* Announcement 1 */}
        <View style={styles.announcementItem}>
          <Text style={styles.announcementOffice}>MSEUF Health and Safety Office</Text>
          <Text style={styles.announcementTime}>1h ago</Text>
          <Text style={styles.announcementText}>
            The Health and Safety Office in collaboration with the Lucena City Disaster Risk Reduction and Management Office and BFP R4A Lucena City Fire Station will conduct a University-wide earthquake drill this coming March 19, 2024 (Tuesday) at 9:00 am.
          </Text>
          <Image source={require('../assets/images/first_earth.png')} style={styles.announcementImage} />
          <Text style={styles.announcementLink}>google/forms.jdlenausie987hL/</Text>
          <View style={styles.separator} />
        </View>

        {/* Announcement 2 */}
        <View style={styles.announcementItem}>
          <Text style={styles.announcementOffice}>MSEUF Health and Safety Office</Text>
          <Text style={styles.announcementTime}>8h ago</Text>
          <Text style={styles.announcementText}>
            Another goal achieved! MSEUF is now a member of ARISE Philippines! This showcases our unwavering commitment to produce programs related to the four thematic areas of DRRM in collaboration with the private sectors towards a resilient future!
          </Text>
          <Image source={require('../assets/images/second_earth.png')} style={styles.announcementImage} />
          <Text style={styles.announcementLink}>google/forms.jdlenausie987hL/</Text>
          <View style={styles.separator} />
        </View>
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
