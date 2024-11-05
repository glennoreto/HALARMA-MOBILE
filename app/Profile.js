import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/styles/ProfileStyles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
          setImage(parsedData.image || null);
        } else {
          Alert.alert('No Data', 'User data not found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data');
        console.error('Error loading user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission to access camera roll is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);

        // Update the stored userData with the new image
        const updatedUserData = { ...userData, image: selectedImage };
        setUserData(updatedUserData);
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Profile Image Section */}
          <View style={styles.profileContainer}>
            <View style={styles.imageWrapper}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <FontAwesome name="user-circle" size={100} color="#ccc" />
              )}
              <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
                <Icon name="camera" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Header Section */}
          <View style={styles.profileHeader}>
            <Text style={styles.profileName}>{`${userData.firstName} ${userData.middleInitial} ${userData.surname}`}</Text>
            <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('Account', { userData })}>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Personal Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Information:</Text>
            <Text style={styles.infoText}>Full Name: {`${userData.firstName} ${userData.middleInitial} ${userData.surname}`}</Text>
            <Text style={styles.infoText}>Date of Birth: {userData.birthday}</Text>
            <Text style={styles.infoText}>Sex: {userData.sex}</Text>
            <Text style={styles.infoText}>User Type: {userData.userType}</Text>
            {userData.userType === 'Student' && <Text style={styles.infoText}>Year: {userData.year}</Text>}
          </View>

          {/* Contact Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contact Information:</Text>
            <Text style={styles.infoText}>Phone: {userData.phone}</Text>
            <Text style={styles.infoText}>Email: {userData.email}</Text>
            <Text style={styles.infoText}>Address: {userData.address}</Text>
            <Text style={styles.infoText}>Department: {userData.department}</Text>
          </View>

          {/* View Report History Link */}
          <TouchableOpacity style={styles.reportLink} onPress={() => Alert.alert('View Report History')}>
            <Text style={styles.reportLinkText}>View Report History</Text>
          </TouchableOpacity>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Homepages')}>
              <Icon name="home" size={25} color="#333" style={styles.navIcon} />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Notification')}>
              <Icon name="bell" size={25} color="#333" style={styles.navIcon} />
              <Text style={styles.navText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('History')}>
              <Icon name="history" size={25} color="#333" style={styles.navIcon} />
              <Text style={styles.navText}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
              <Icon name="user" size={25} color="#333" style={styles.navIcon} />
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;