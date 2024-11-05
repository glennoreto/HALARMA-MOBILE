// app/Programs.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../assets/styles/ProgramsStyles'; // Custom styles for the Programs screen
import { supabase } from './lib/supabaseClient'; // Import the Supabase client

const Programs = () => {
  const router = useRouter(); // Initialize the router
  const [programs, setPrograms] = useState([]); // State to hold programs
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        let { data, error } = await supabase.from('programs').select('*');
        if (error) {
          console.error('Error fetching programs:', error.message); // Log error message
        } else {
          console.log('Fetched programs data:', data); // Log fetched data
          setPrograms(data);
        }
      } catch (error) {
        console.error('Supabase fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms(); // Call the fetch function
  }, []);

  return (
    <View style={styles.container}>
      {/* Title Section - Sticky */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Upcoming Programs & Events</Text>
        <View style={styles.separator} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          programs.length > 0 ? (
            programs.map((program) => (
              <View key={program.id} style={styles.card}>
                <Text style={styles.cardTitle}>{program.title}</Text>
                <Text style={styles.cardTime}>{new Date(program.created_at).toLocaleString()}</Text>
                <Text style={styles.cardDescription}>{program.description}</Text>
                {program.image && (
                  <TouchableOpacity onPress={() => router.push('/Eventpic1')}> {/* Adjust navigation as needed */}
                    <Image source={{ uri: program.image }} style={styles.cardImage} />
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <Text>No programs available</Text> // Fallback if no data
          )
        )}
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

export default Programs;
