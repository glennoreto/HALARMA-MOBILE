import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',  // Softer background color for a clean, minimalistic look
    paddingTop: 60,  // To accommodate the back button at the top
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 20, // Adds padding to the bottom of the ScrollView for better layout
  },
  section: {
    marginBottom: 30, // Consistent bottom margin for sections
  },
  backButton: {
    position: 'absolute',
    top: 30,  // Distance from the top of the screen
    left: 20,
    zIndex: 10,  // Ensures the back button stays on top of other elements
  },
  heading: {
    fontSize: 26,  // Slightly larger heading
    fontWeight: 'bold',
    color: '#800000',  // Maroon color for the main heading
    marginBottom: 15,  // Increased bottom margin for more breathing room
  },
  subheading: {
    fontSize: 20,  // Increased font size for subheadings
    fontWeight: '600',
    color: '#800000',  // Maroon color for subheadings as well
    marginBottom: 10,  // Space between subheading and text
  },
  paragraph: {
    fontSize: 16,  // Keeping the text size consistent for readability
    lineHeight: 24,  // Slightly increased line height for better readability
    color: '#4A4A4A',  // Darker gray for body text to soften the contrast
    marginBottom: 25,  // Consistent spacing between paragraphs
  },
});

export default styles;
