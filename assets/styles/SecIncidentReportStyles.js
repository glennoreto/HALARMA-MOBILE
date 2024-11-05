import { StyleSheet,  Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5', // Light grey background
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
    left: 70, // 15% of screen height for bottom margin
  },
  logo: {
    width: width * 0.5, // 50% of screen width
    height: height * 0.2, // 20% of screen height
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000', // Red color for the "Other Details" heading
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  textArea: {
    width: '100%',
    height: 100,
    borderColor: '#800000', // Red border for text area
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top', // Ensure text starts at the top
  },
  exampleText: {
    fontSize: 12,
    color: '#800000',
    marginBottom: 20,
    marginTop: 5,
  },
  imageUploadContainer: {
    borderColor: '#800000', // Red border for image container
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  cameraIcon: {
    
    marginBottom: 10,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  backButton: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    marginBottom: 150,
  },
  nextButton: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    marginBottom: 150,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
   
  },


   bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    left: 0,                             // Align it to the left (no gap on the left side)
    right: 0,                            // Align it to the right (no gap on the right side)  // Elevation for Android to create depth
    zIndex: 10,   
    position: 'absolute',                // Stick to the bottom of the screen
    bottom: 0,   
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


  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 10,
  },
  
});

export default styles;
