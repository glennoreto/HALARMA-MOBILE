import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5', // Light grey background
    paddingHorizontal: 20,
    justifyContent: 'center', // Center content vertically
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 66,
    left: 70, // 15% of screen height for bottom margin
  },
  logo: {
    width: width * 0.5, // 50% of screen width
    height: height * 0.2, // 20% of screen height
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10, // Add margin for spacing
  },
  subHeaderText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 30, // Adjusted for more balanced spacing
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 1,
  },

  labelTime: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20, // Add space above the text
    marginBottom: 1, // Add space below the text
  },
  
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  dateInputText: {
    fontSize: 16,
    color: '#000',
  },
  calendarIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  
  },
  backButton: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    marginBottom: 40, // Reduce margin to avoid too much spacing at the bottom
  },
  backButton: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    marginBottom: 99,
  },
  nextButton: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    marginBottom: 99,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
   
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay when modal is active
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute', // Stick to the bottom of the screen
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
