import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import styles from '../assets/styles/SecIncidentReportStyles';

const SecIncidentReport = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal state
  const router = useRouter();

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
        setImage(result.assets ? result.assets[0].uri : result.uri);
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

  const handleNext = () => {
    if (!description) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }
    router.push('/ReportSuccess');
  };

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <Text style={styles.headerText}>Incident Report Form</Text>
        <Text style={styles.subbHeaderText}>Nature Of Hazard</Text>
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

        {/* Modal for image picker */}
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

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
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

export default SecIncidentReport;
