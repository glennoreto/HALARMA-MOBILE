import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // For reading image files
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createClient } from '@supabase/supabase-js';
import styles from '../assets/styles/AccountStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase Client
const supabase = createClient('https://bmtrvbxbqdmzfhyotepu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdHJ2YnhicWRtemZoeW90ZXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMzU3MDEsImV4cCI6MjA0NDgxMTcwMX0.87VD2EKn3e57F3kd7_dqQiglGIlcqSlfxfoe0UR_Ulo');

const Account = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('+63');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [userType, setUserType] = useState('');
  const [year, setYear] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Function to handle image picking and uploading
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Permission to access the media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;

        // Upload the image to Supabase
        const uploadedImageUrl = await uploadImage(selectedImageUri);

        if (uploadedImageUrl) {
          setImage(uploadedImageUrl); // Update state with the public URL of the uploaded image
          Alert.alert('Success', 'Image uploaded successfully!');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  // Function to upload the image to Supabase storage
  const uploadImage = async (imageUri) => {
    try {
      // Step 1: Read the image file as base64
      const imageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Step 2: Create a unique file name
      const fileExtension = imageUri.split('.').pop(); // Get file extension
      const fileName = `profile_${Date.now()}.${fileExtension}`; // Unique file name
      const filePath = `Profile/${fileName}`; // Define folder path

      // Step 3: Convert base64 to blob
      const imageBlob = {
        uri: `data:image/${fileExtension};base64,${imageData}`, // Base64 data with MIME type
        type: `image/${fileExtension}`,
        name: fileName,
      };

      // Step 4: Upload image to Supabase storage bucket
      const { data, error } = await supabase.storage
        .from('IMAGES') // Replace with your bucket name
        .upload(filePath, imageBlob, {
          contentType: `image/${fileExtension}`, // Set correct MIME type
          upsert: true,
        });

      if (error) {
        console.error('Error uploading image to Supabase:', error.message);
        Alert.alert('Error', 'Failed to upload the image.');
        return null;
      }

      // Step 5: Get the public URL of the uploaded image
      const { publicURL, error: urlError } = supabase.storage
        .from('IMAGES')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('Error fetching public URL:', urlError.message);
        Alert.alert('Error', 'Failed to retrieve image URL.');
        return null;
      }

      return publicURL; // Return the public URL
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'An error occurred while uploading the image.');
      return null;
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  const handlePhoneChange = (value) => {
    if (/^\+63[0-9]*$/.test(value) && value.length <= 13) {
      setPhone(value);
    }
  };

  const isFormComplete = () => {
    const baseFieldsComplete =
      firstName.trim() !== '' &&
      surname.trim() !== '' &&
      middleInitial.trim() !== '' &&
      sex.trim() !== '' &&
      phone.trim() !== '' &&
      phone.length === 13 &&
      email.trim() !== '' &&
      address.trim() !== '' &&
      department.trim() !== '' &&
      userType.trim() !== '';

    if (userType === 'Student') {
      return baseFieldsComplete && year.trim() !== '';
    }
    return baseFieldsComplete;
  };

  const handleSubmit = () => {
    if (isFormComplete()) {
      setShowModal(true);
    } else {
      Alert.alert('Incomplete Form', 'Please fill out all fields before submitting.');
    }
  };

  const confirmSubmission = async () => {
    setShowModal(false);

    const userData = {
      firstName,
      surname,
      middleInitial,
      sex,
      birthday: birthday.toLocaleDateString(),
      phone,
      email,
      address,
      department,
      userType,
      year,
      image,
    };

    try {
      console.log('Saving user data:', userData);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Submitted', 'Your information has been submitted.');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
              <View style={styles.imageWrapper}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                  <Icon name="user-circle" size={width * 0.35} color="#ccc" />
                )}
                <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
                  <Icon name="camera" size={20} style={styles.cameraIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Personal Information Fields */}
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <RNPickerSelect
                onValueChange={(value) => setUserType(value)}
                items={[
                  { label: 'Faculty', value: 'Faculty' },
                  { label: 'Staff', value: 'Staff' },
                  { label: 'Student', value: 'Student' },
                ]}
                placeholder={{
                  label: 'User Type:',
                  value: null,
                  color: '#9EA0A4',
                }}
                value={userType}
              />

              <TextInput
                style={styles.input}
                placeholder="First Name:"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Surname:"
                value={surname}
                onChangeText={setSurname}
              />
              <View style={styles.rowContainer}>
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Middle Initial:"
                  value={middleInitial}
                  onChangeText={setMiddleInitial}
                />
                          <RNPickerSelect
                  onValueChange={(value) => setSex(value)}
                  items={[
                    { label: 'Female', value: 'Female' },
                    { label: 'Male', value: 'Male' },
                  ]}
                  placeholder={{
                    label: 'Sex:',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  style={{
                    inputAndroid: {
                      height: styles.input.height,
                      borderColor: styles.input.borderColor,
                      borderWidth: styles.input.borderWidth,
                      borderRadius: styles.input.borderRadius,
                      paddingHorizontal: 55,
                      marginBottom: styles.input.marginBottom,
                      backgroundColor: styles.input.backgroundColor,
                      color: '#000',
                    },
                    inputIOS: {
                      height: styles.input.height,
                      borderColor: styles.input.borderColor,
                      borderWidth: styles.input.borderWidth,
                      borderRadius: styles.input.borderRadius,
                      paddingHorizontal: styles.input.paddingHorizontal,
                      marginBottom: styles.input.marginBottom,
                      backgroundColor: styles.input.backgroundColor,
                      color: '#000',
                    },
                  }}
                  value={sex}
                />
              </View>
              

              <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.7}>
                <TextInput
                  style={styles.input}
                  placeholder="Birthday:"
                  value={birthday.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthday}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              {/* Contact Information */}
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number:"
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address:"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Address:"
                value={address}
                onChangeText={setAddress}
              />

              <RNPickerSelect
                onValueChange={(value) => setDepartment(value)}
                items={[
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
                ]}
                placeholder={{
                  label: 'Select Department:',
                  value: null,
                  color: '#9EA0A4',
                }}
                value={department}
              />

              {userType === 'Student' && (
                <RNPickerSelect
                  onValueChange={(value) => setYear(value)}
                  items={[
                    { label: 'First Year', value: 'First Year' },
                    { label: 'Second Year', value: 'Second Year' },
                    { label: 'Third Year', value: 'Third Year' },
                    { label: 'Fourth Year', value: 'Fourth Year' },
                  ]}
                  placeholder={{
                    label: 'Select Year:',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  value={year}
                />
              )}

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            {/* Confirmation Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => setShowModal(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                  <Text style={styles.modalTitle}>Confirmation</Text>
                  <Text>
                    By submitting, you confirm all provided information is accurate.
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setShowModal(false)}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.confirmButton]}
                      onPress={confirmSubmission}
                    >
                      <Text>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Account;
