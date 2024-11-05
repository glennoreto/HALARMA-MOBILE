import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../assets/styles/ProgramsStyles'; // Custom styles for the Programs screen

const Programs = () => {
  const router = useRouter(); // Initialize the router

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Upcoming Programs & Event</Text>
          <View style={styles.separator} />
        </View>

        {/* First Event Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>MSEUF Health and Safety Office</Text>
          <Text style={styles.cardTime}>1h ago</Text>
          <Text style={styles.cardDescription}>
            The "Basta envergan, Ligtas sa kapahamakan program" is a proactive initiative established by the Health and Safety Office to ensure the well-being and security of all employees within our organization.
          </Text>
          <TouchableOpacity onPress={() => router.push('/Eventspic1')}>
            <Image source={require('../assets/images/event1.png')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>

        {/* Second Event Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>MSEUF Health and Safety Office</Text>
          <Text style={styles.cardTime}>8h ago</Text>
          <Text style={styles.cardDescription}>
            The Health and Safety Office launched the "Bantay Kalusugan, Malusog na Envergan" program which aims to strengthen medical surveillance, preventive measures for various diseases and promotion of healthy lifestyle in the University.
          </Text>
          <TouchableOpacity onPress={() => router.push('/Eventpic2')}>
            <Image source={require('../assets/images/event2.png')} style={styles.cardImage} />
          </TouchableOpacity>
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

export default Programs;
