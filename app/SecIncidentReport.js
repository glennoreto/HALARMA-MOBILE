import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker'; // Import the image picker from Expo
import styles from '../assets/styles/SecIncidentReportStyles'; // Assuming styles are defined here

const SecIncidentReport = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter(); // Initialize the router

  // Function to handle image selection
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri); // Set the selected image URI
    }
  };

  // Handle navigation to the next screen
  const handleNext = () => {
    if (!description) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }
    router.push('/ReportSuccess'); // Navigate using router
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo and Header */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bell_halarmaS23.png')} style={styles.logo} />
      </View>

      <Text style={styles.headerText}>Incident Report Form</Text>
      <Text style={styles.subHeaderText}>Other Details:</Text>

      {/* Description Field */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={5}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.exampleText}>Eg. slippery floor, exposed wiring, broken equipment</Text>

      {/* Photographic Evidence */}
      <Text style={styles.label}>Photographic Evidence</Text>
      <TouchableOpacity style={styles.imageUploadContainer} onPress={selectImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <>
            <Icon name="camera" size={50} color="#666" style={styles.cameraIcon} />
            <Text style={styles.imageUploadText}>Add Image</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
};

export default SecIncidentReport;
