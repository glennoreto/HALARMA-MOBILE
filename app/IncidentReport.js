import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import styles from '../assets/styles/IncidentReportStyles'; // Assuming styles are imported here
import CalendarPicker from 'react-native-calendar-picker'; // Calendar picker for date selection
import moment from 'moment'; // For date formatting
import Icon from 'react-native-vector-icons/FontAwesome5';

const IncidentReport = () => {
  const [location, setLocation] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Stores the selected date
  const [timeObserved, setTimeObserved] = useState('');
  const [showCalendar, setShowCalendar] = useState(false); // Show/hide calendar
  const router = useRouter(); // Initialize the router

  // Handle 'Next' button click
  const handleNext = () => {
    router.push('/SecIncidentReport'); // Navigate using router
  };

  // Handle calendar date change
  const handleDateChange = (date) => {
    setSelectedStartDate(date); // Set selected date
    setShowCalendar(false); // Hide calendar after selecting a date
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      {/* Form Fields */}
      <Text style={styles.headerText}>Incident Report Form</Text>
      <Text style={styles.subHeaderText}>Nature Of Hazard</Text>
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        accessibilityLabel="Location input"
      />

      <Text style={styles.label}>Date</Text>
      <TouchableWithoutFeedback onPress={() => setShowCalendar(true)}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.dateInputText}>
            {selectedStartDate ? moment(selectedStartDate).format('MM/DD/YYYY') : 'Enter Date'}
          </Text>
          <Image
            source={require('../assets/icons/Calendar.png')}
            style={styles.calendarIcon}
          />
        </View>
      </TouchableWithoutFeedback>

      <Text style={styles.labelTime}>Time of Observation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time Observed"
        value={timeObserved}
        onChangeText={setTimeObserved}
        accessibilityLabel="Time of observation input"
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Calendar */}
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <CalendarPicker
            onDateChange={handleDateChange}
            todayBackgroundColor="#ffeb3b"
            selectedDayColor="#2196F3"
            selectedDayTextColor="#FFFFFF"
          />
        </View>
      </Modal>

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

export default IncidentReport;
