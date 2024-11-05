import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome icons
import { useRouter } from 'expo-router'; // Use useRouter for navigation
import { supabase } from './lib/supabase'; // Supabase client setup
import * as ImagePicker from 'expo-image-picker'; // Import image picker
import styles from '../assets/styles/AccountStyles'; // Import your styles

const Account = () => {
  const { width } = Dimensions.get('window');
  const router = useRouter(); // Initialize the router

  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [imageName, setImageName] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [course, setCourse] = useState('');

  // Image picker function
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio to keep the circular frame intact
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      const fileName = `profile_${Date.now()}.jpg`; 
      setImage(selectedImage);
      setImageName(fileName);

      // Upload the image to Supabase
      uploadImageToSupabase(selectedImage, fileName);
    }
  };

  // Upload image to Supabase storage
  const uploadImageToSupabase = async (uri, fileName) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, blob);

      if (error) {
        throw new Error(error.message);
      }

      const { publicURL, error: urlError } = supabase
        .storage
        .from('profile-images')
        .getPublicUrl(fileName);

      if (urlError) {
        throw new Error(urlError.message);
      }

      Alert.alert('Success', 'Image uploaded successfully!');
      console.log('Image URL:', publicURL); 
    } catch (error) {
      Alert.alert('Upload Error', error.message);
    }
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    Alert.alert('Submitted', 'Your information has been submitted.');
    router.push('/Login'); // Navigate using useRouter
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Icon name="user-circle" size={width * 0.35} color="#ccc" />
          )}
          {/* Camera Icon Overlay */}
          <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
            <Icon name="camera" size={20} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Personal Information Section */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
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
          <TextInput 
            style={[styles.input, styles.smallInput]} 
            placeholder="Sex:" 
            value={sex}
            onChangeText={setSex}
          />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Birthday:" 
          value={birthday}
          onChangeText={setBirthday}
        />
        
        {/* Contact Information Section */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Phone Number:" 
          value={phone}
          onChangeText={setPhone}
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
        <TextInput 
          style={styles.input} 
          placeholder="Department:" 
          value={department}
          onChangeText={setDepartment}
        />
        <View style={styles.rowContainer}>
          <TextInput 
            style={[styles.input, styles.smallInput]} 
            placeholder="Year:" 
            value={year}
            onChangeText={setYear}
          />
          <TextInput 
            style={[styles.input, styles.smallInput]} 
            placeholder="Course:" 
            value={course}
            onChangeText={setCourse}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit} // Trigger submit logic
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
