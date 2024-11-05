// ProfileStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',  // Light grey background
  },
  // Profile Header Section
  profileHeader: {
    flexDirection: 'row',
  
    justifyContent: 'center',

    alignItems: 'center',
    marginVertical: 45,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editIcon: {
    marginTop: 5,
    marginLeft: 5,
  },
  // Personal Information Section
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#800000',  // Deep red color
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  // Report History Link
  reportLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  reportLinkText: {
    color: '#1E90FF',  // Blue link color
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Bottom Navigation Section
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#333',
    
    
  },
  navIcon: {
    width: 28,
    height: 25,
    marginBottom: 5,
    textAlign: 'center',
  

  },
});

export default styles;
