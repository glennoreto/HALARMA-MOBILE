import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import styles from '../assets/styles/SecIncidentReportStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'; // For reading the image file as base64 or blob
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient('https://bmtrvbxbqdmzfhyotepu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdHJ2YnhicWRtemZoeW90ZXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMzU3MDEsImV4cCI6MjA0NDgxMTcwMX0.87VD2EKn3e57F3kd7_dqQiglGIlcqSlfxfoe0UR_Ulo');

const SecIncidentReport = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal state
  const router = useRouter();

  // Load saved form data on component mount
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedDescription = await AsyncStorage.getItem('description');
        const savedImage = await AsyncStorage.getItem('image');
        if (savedDescription) setDescription(savedDescription);
        if (savedImage) setImage(savedImage);
      } catch (error) {
        console.error('Error loading form data', error);
      }
    };
    loadFormData();
  }, []);

  // Save form data to AsyncStorage
  const saveFormData = async () => {
    try {
      await AsyncStorage.setItem('description', description);
      await AsyncStorage.setItem('image', image);
    } catch (error) {
      console.error('Error saving form data', error);
    }
  };

  // Function to handle image selection
  const handleImagePicker = async (fromCamera = false) => {
    try {
      let permissionResult;
      if (fromCamera) {
        permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      } else {
        permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Denied',
          `Permission to access the ${fromCamera ? 'camera' : 'media library'} is required!`
        );
        return;
      }

      const result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

      if (!result.canceled) {
        const selectedImageUri = result.assets ? result.assets[0].uri : result.uri;
        setImage(selectedImageUri);

        // Upload the image after it's selected
        await uploadImage(selectedImageUri);  // Assuming uploadImage is an async function
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while selecting the image. Please try again.');
    } finally {
      setModalVisible(false); // Close modal after picking image
    }
  };

  // Function to delete the image
  const handleDeleteImage = () => {
    setImage(null);
    Alert.alert('Image Removed', 'The image has been removed successfully.');
  };

  // Function to upload the image to Supabase storage
  const uploadImage = async (imageUri) => {
    try {
      // Step 1: Read the image file as a base64 string
      const imageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Step 2: Define file path and name
      const fileExtension = imageUri.split('.').pop(); // Get file extension
      const fileName = `incident_RE${Date.now()}.${fileExtension}`; // Create a unique file name
      const filePath = `uploads/${fileName}`; // Define folder path (optional)
  
      // Step 3: Convert Base64 to Blob for upload
      const imageBlob = {
        uri: `data:image/${fileExtension};base64,${imageData}`, // Use base64 data with MIME type
        type: `image/${fileExtension}`,
        name: fileName,
      };
  
      // Step 4: Upload image to Supabase Storage
      const { data, error } = await supabase.storage
        .from('IMAGES') // Use your bucket name
        .upload(filePath, imageBlob, {
          contentType: `image/${fileExtension}`, // Set correct MIME type
          upsert: true,
        });
  
      if (error) {
        console.error('Error uploading image to Supabase:', error.message);
        Alert.alert('Upload Failed', 'An error occurred while uploading the image.');
        return null;
      }
  
      // Step 5: Get the public URL of the uploaded image
      const { publicURL, error: urlError } = supabase.storage
        .from('IMAGES')
        .getPublicUrl(filePath);
  
      if (urlError) {
        console.error('Error getting public URL:', urlError.message);
        Alert.alert('URL Error', 'Unable to fetch public URL of the uploaded image.');
        return null;
      }
  
      // Step 6: Return the public URL
      Alert.alert('Upload Success', 'Image uploaded successfully!');
      return publicURL; // Save or use this URL for displaying the image
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'An unexpected error occurred while uploading the image.');
    }
  };
  
  

  // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async () => {
  // Validate required fields
  if (!description || !location || !room || !selectedStartDate || !timeObserved) {
    Alert.alert('Error', 'Please fill in all the required fields.');
    return;
  }

  try {
    // Save form data to AsyncStorage (optional)
    await saveFormData();

    // Prepare data for Supabase insertion
    const formData = {
      location: location, // Replace with your state variable for location
      room: room,         // Replace with your state variable for room
      time: timeObserved, // Replace with your state variable for time
      date: selectedStartDate, // Format date as YYYY-MM-DD
      description: description,
      image_url: image || null, // Use the uploaded image URL
      user_id: 'user-unique-id', // Replace with actual user_id from authentication
    };

    // Insert data into Supabase `incident_reports` table
    const { data, error } = await supabase
      .from('incident')
      .insert([formData]);

    if (error) {
      console.error('Error saving incident report:', error.message);
      Alert.alert('Error', 'Failed to submit the report. Please try again.');
      return;
    }

    // Show success message and navigate to success page
    Alert.alert('Success', 'Your incident report has been submitted successfully.');
    router.push('/ReportSuccess');
  } catch (error) {
    console.error('Error submitting form:', error.message);
    Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
  }




    try {
      // Save form data to AsyncStorage
      await saveFormData();

      // Post the data to backend (replace with actual API request)
      const response = await fetch('https://bmtrvbxbqdmzfhyotepu.supabase.co/incident', { // Replace URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          image,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your incident report has been submitted successfully.');
        router.push('/ReportSuccess');
      } else {
        Alert.alert('Error', 'Failed to submit the report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Incident Report Form</Text>
        <Text style={styles.subbHeaderText}>Nature Of Hazard</Text>
        <Text style={styles.subHeaderText}>Other Details:</Text>

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

        <Text style={styles.label}>Photographic Evidence</Text>
        <TouchableOpacity
          style={styles.imageUploadContainer}
          onPress={() => setModalVisible(true)}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <Text style={styles.imageUploadText}>Tap to select or capture an image</Text>
          )}
        </TouchableOpacity>
        {image && (
          <TouchableOpacity style={styles.deleteImageButton} onPress={handleDeleteImage}>
            <Icon name="trash" size={20} color="#FFF" />
            <Text style={styles.deleteImageButtonText}>Delete Image</Text>
          </TouchableOpacity>
        )}

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Image Source</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleImagePicker(true)}
              >
                <Icon name="camera" size={20} color="#FFF" />
                <Text style={styles.modalButtonText}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleImagePicker(false)}
              >
                <Icon name="images" size={20} color="#FFF" />
                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SecIncidentReport;
