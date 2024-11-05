import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import styles from '../assets/styles/NotificationStyles'; // Import styles

const Notification = () => {
  const router = useRouter(); // Initialize the router

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.separator} />
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.notificationContainer}>
        {/* Notification 1 */}
        <View style={[styles.notificationItem, { backgroundColor: '#e74c3c' }]}>
          <View style={styles.notificationIconCircle}>
            <Icon name="bell" size={24} color="#fff" />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationMessage}>
              Please be informed that Storm Signal No. 2 has been raised in our area...
            </Text>
            <Text style={styles.notificationTime}>1 day ago</Text>
          </View>
        </View>

        {/* Notification 2 */}
        <View style={[styles.notificationItem, { backgroundColor: '#f39c12' }]}>
          <View style={styles.notificationIconCircle}>
            <Icon name="bell" size={24} color="#fff" />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationMessage}>
              Good Day Student! New Announcement posted: With scorching temperatures expected today...
            </Text>
            <Text style={styles.notificationTime}>8 hours ago</Text>
          </View>
        </View>

        {/* Notification 3 */}
        <View style={[styles.notificationItem, { backgroundColor: '#f39c12' }]}>
          <View style={styles.notificationIconCircle}>
            <Icon name="bell" size={24} color="#fff" />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationMessage}>
              Good Day Student! New Announcement posted: Road near the University Gymnasium is under repair...
            </Text>
            <Text style={styles.notificationTime}>1 day ago</Text>
          </View>
        </View>

        {/* Notification 4 */}
        <View style={[styles.notificationItem, { backgroundColor: '#f1c40f' }]}>
          <View style={styles.notificationIconCircle}>
            <Icon name="bell" size={24} color="#fff" />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationMessage}>
              Good Day Student! New Announcement posted: Another goal achieved! MSUIF is now a member of ARISE Philippines!...
            </Text>
            <Text style={styles.notificationTime}>1 hour ago</Text>
          </View>
        </View>

        {/* Notification 5 */}
        <View style={[styles.notificationItem, { backgroundColor: '#2ecc71' }]}>
          <View style={styles.notificationIconCircle}>
            <Icon name="bell" size={24} color="#fff" />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationMessage}>
              Good Day Student! New Announcement posted: The Health and Safety Office in collaboration with the Lucena City...
            </Text>
            <Text style={styles.notificationTime}>6 hours ago</Text>
          </View>
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

export default Notification;
