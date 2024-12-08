import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../assets/styles/IncidentReportStyles'; 
import CalendarPicker from 'react-native-calendar-picker'; 
import moment from 'moment'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { Picker } from '@react-native-picker/picker'; 

const IncidentReport = () => {
  const [location, setLocation] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [timeObserved, setTimeObserved] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isOtherLocation, setIsOtherLocation] = useState(false);
  const [room, setRoom] = useState('');
  const [floor, setFloor] = useState('1');
  const router = useRouter();

  const handleNext = () => {
    router.push('/SecIncidentReport');
  };

  const handleDateChange = (date) => {
    setSelectedStartDate(date);
    setShowCalendar(false);
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeObserved;
    setShowTimePicker(false);
    setTimeObserved(moment(currentDate).format('HH:mm'));
  };

  const handleLocationChange = (value) => {
    if (value === 'Others') {
      setIsOtherLocation(true);
    } else {
      setIsOtherLocation(false);
    }
    setLocation(value);
  };

  const handleRoomChange = (value) => {
    setRoom(value);
  };

  const handleFloorChange = (value) => {
    setFloor(value);
  };

  const locationOptions = [
    { label: 'Architecture and Fine Arts (CAFA)', value: 'Architecture and Fine Arts (CAFA)' },
    { label: 'Arts and Sciences (CAS)', value: 'Arts and Sciences (CAS)' },
    { label: 'Business and Accountancy (CBA)', value: 'Business and Accountancy (CBA)' },
    { label: 'Computing and Multimedia Studies (CCMS)', value: 'Computing and Multimedia Studies (CCMS)' },
    { label: 'Criminal Justice and Criminology (CCJC)', value: 'Criminal Justice and Criminology (CCJC)' },
    { label: 'Education (CEd)', value: 'Education (CEd)' },
    { label: 'Engineering (CEng)', value: 'Engineering (CEng)' },
    { label: 'Maritime Studies (CME)', value: 'Maritime Studies (CME)' },
    { label: 'Physical Education and Sports (IPES)', value: 'Physical Education and Sports (IPES)' },
    { label: 'International Hospitality and Tourism Management (CIHTM)', value: 'International Hospitality and Tourism Management (CIHTM)' },
    { label: 'Basic Education Department (BED)', value: 'Basic Education Department (BED)' },
    { label: 'Gymnasium', value: 'Gymnasium' },
    { label: 'Library', value: 'Library' },
    { label: 'Main Canteen', value: 'Main Canteen' },
    { label: 'BEd Canteen', value: 'BEd Canteen' },
    { label: 'Swimming Pool', value: 'Swimming Pool' },
    { label: 'Gate 1 Parking Lot', value: 'Gate 1 Parking Lot' },
    { label: 'Gate 2 Parking Lot', value: 'Gate 2 Parking Lot' },
    { label: 'Gate 3 Parking Lot', value: 'Gate 3 Parking Lot' },
    { label: 'Tennis Court', value: 'Tennis Court' },
    { label: 'Student Lounge', value: 'Student Lounge' },
    { label: 'iLounge', value: 'iLounge' },
    { label: 'BEd Covered Court', value: 'BEd Covered Court' },
    { label: 'Main Covered Court', value: 'Main Covered Court' },
    { label: 'AEC Little Theater', value: 'AEC Little Theater' },
    { label: 'Banyuhay Bridge', value: 'Banyuhay Bridge' },
    { label: 'Others', value: 'Others' }
  ];

  // Sort the options alphabetically and ensure "Others" is at the end
  const sortedLocationOptions = locationOptions.sort((a, b) => {
    if (a.value === 'Others') return 1; // 'Others' should be last
    if (b.value === 'Others') return -1; // 'Others' should be last
    return a.label.localeCompare(b.label); // Alphabetical sorting
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false} // Hide the scrollbar indicator
        >
          {/* Form Fields */}
          <Text style={styles.headerText}>Incident Report Form</Text>
          <Text style={styles.subHeaderText}>Nature Of Hazard</Text>
          <Text style={styles.label}>Location</Text>

          {/* Location Dropdown */}
          <Picker
            selectedValue={location}
            style={styles.picker}
            onValueChange={handleLocationChange}>
            {sortedLocationOptions.map((option) => (
              <Picker.Item label={option.label} value={option.value} key={option.value} />
            ))}
          </Picker>

          {/* Input for Other Location if 'Others' is selected */}
          {isOtherLocation ? (
            <TextInput
              style={styles.input}
              placeholder="Enter Custom Location"
              value={location}
              onChangeText={setLocation}
            />
          ) : (
            <>
              {/* Room input */}
              <Text style={styles.label}>Room</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Room"
                value={room}
                onChangeText={handleRoomChange}
              />

              {/* Floor dropdown */}
              <Text style={styles.label}>Floor</Text>
              <Picker
                selectedValue={floor}
                style={styles.picker}
                onValueChange={handleFloorChange}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
              </Picker>
            </>
          )}

          {/* Date Picker */}
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

          {/* Time Picker */}
          <Text style={styles.labelTime}>Time of Observation</Text>
          <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputText}>
                {timeObserved ? timeObserved : 'Enter Time'}
              </Text>
              <Image
                source={require('../assets/icons/Clock-icon.png')}
                style={styles.calendarIcon}
              />
            </View>
          </TouchableWithoutFeedback>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent={true} animationType="fade" onRequestClose={() => setShowCalendar(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CalendarPicker
              onDateChange={handleDateChange}
              selectedStartDate={selectedStartDate}
            />
            <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.closeModalButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={true}
          onChange={handleTimeChange}
        />
      )}

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
