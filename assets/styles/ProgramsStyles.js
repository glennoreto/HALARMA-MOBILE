// ProgramsStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
     // Light grey background
  },

  
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  


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

  separator: {
    alignSelf: 'center', // Center the separator horizontally
    height: 1,
    backgroundColor: '#ccc', // Softer color for a more subtle effect
    width: '90%', // Slightly wider for better coverage
    marginVertical: 10, // Added vertical margin for spacing
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 45,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    width: '80%',
    marginTop: 5,}
});

export default styles;
