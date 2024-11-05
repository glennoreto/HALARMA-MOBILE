import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../assets/styles/ProfileEditStyle';

const ProfileEdit = () => {
  const router = useRouter();
  const { userInfo: initialUserInfo } = useLocalSearchParams();

  const parsedUserInfo = initialUserInfo ? JSON.parse(initialUserInfo) : {};
  const [formData, setFormData] = useState(parsedUserInfo);

  useEffect(() => {
    if (parsedUserInfo) {
      setFormData(parsedUserInfo);
    }
  }, [initialUserInfo]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSavePress = () => {
    router.push({
      pathname: '/Profile',
      params: {
        updatedUserInfo: JSON.stringify(formData),
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Icon name="user-circle" size={100} color="#800000" />
          </View>
        </View>

        {/* Personal Information Edit Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Information:</Text>
          {[
            { label: 'Full Name', field: 'fullName' },
            { label: 'Date of Birth', field: 'dateOfBirth' },
            { label: 'Age', field: 'age' },
            { label: 'Sex', field: 'sex' },
            { label: 'Contact Number', field: 'contactNumber' },
            { label: 'Blood Type', field: 'bloodType' },
            { label: 'Address', field: 'address' },
            { label: 'Department', field: 'department' },
            { label: 'Year & Course', field: 'yearCourse' },
          ].map(({ label, field }, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{label}:</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${label}`}
                value={formData[field]}
                onChangeText={(value) => handleInputChange(field, value)}
              />
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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

export default ProfileEdit;
