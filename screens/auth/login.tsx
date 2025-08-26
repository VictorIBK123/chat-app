import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../types/navigation';

// Get window dimensions for responsive styling if needed, though mostly using flexbox
const { width } = Dimensions.get('window');

type LoginProps = StackScreenProps<RootStackParamList, 'LoginScreen'>
const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Welcome Back! 
        </Text>

        {/* Email and Password Login Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email Address
            </Text>
            <View style={styles.inputWrapper}>
              {/* Mail icon */}
              <Icon name="envelope" size={20} color="#9ca3af" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                aria-label="Email Address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Password
            </Text>
            <View style={styles.inputWrapper}>
              {/* Lock icon */}
              <Icon name="lock" size={20} color="#9ca3af" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                aria-label="Password"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider for "Or continue with" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>
            Or continue with
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Section */}
        <TouchableOpacity style={styles.googleSignInButton}>
          {/* Google icon */}
          <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
          <Text style={styles.googleSignInButtonText}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.signUpPrompt}>
          Don't have an account?{' '}
          <Text suppressHighlighting={true} onPress={()=>navigation.navigate('SignupScreen')} style={styles.signUpLink}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the whole screen
    backgroundColor: '#1a202c', // Corresponds to Tailwind's bg-gray-900
    alignItems: 'center', // Center content horizontally
  },
  card: {
    justifyContent:"center",
    backgroundColor: '#2d3748', // Corresponds to Tailwind's bg-gray-800
    padding: 32, // Equivalent to Tailwind's p-8
    borderRadius: 8, // Equivalent to Tailwind's rounded-lg
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8, // Shadow for Android
    width: '100%',
    height:'100%',
    maxWidth: 400, // Equivalent to Tailwind's max-w-md
    borderColor: '#4a5568', // Corresponds to Tailwind's border-gray-700
    borderWidth: 1,
  },
  title: {
    fontSize: 28, // Corresponds to Tailwind's text-3xl
    fontWeight: '800', // Corresponds to Tailwind's font-extrabold
    textAlign: 'center',
    color: '#fff', // Corresponds to Tailwind's text-white
    marginBottom: 32, // Equivalent to Tailwind's mb-8
  },
  inputSection: {
    marginBottom: 32, // Equivalent to outer space-y-6, combining inputGroup margins
  },
  inputGroup: {
    marginBottom: 24, // Spacing between input fields
  },
  label: {
    fontSize: 14, // Corresponds to Tailwind's text-sm
    fontWeight: '500', // Corresponds to Tailwind's font-medium
    color: '#cbd5e0', // Corresponds to Tailwind's text-gray-300
    marginBottom: 8, // Equivalent to Tailwind's mb-2
  },
  inputWrapper: {
    flexDirection: 'row', // Align icon and text input horizontally
    alignItems: 'center',
    borderRadius: 6, // Corresponds to Tailwind's rounded-md
    borderWidth: 1,
    borderColor: '#4a5568', // Corresponds to Tailwind's border-gray-600
    backgroundColor: '#4a5568', // Corresponds to Tailwind's bg-gray-700
  },
  icon: {
    paddingLeft: 12, // Equivalent to Tailwind's pl-3
    paddingRight: 8, // Added for better spacing before input text
  },
  input: {
    flex: 1, // Allows input to take up remaining space
    paddingVertical: 10, // Equivalent to Tailwind's py-2
    color: '#fff', // Corresponds to Tailwind's text-white
    fontSize: 14, // Corresponds to Tailwind's sm:text-sm
    height: 40, // Ensure consistent input height
  },
  signInButton: {
    width: '100%',
    paddingVertical: 10, // Equivalent to Tailwind's py-2
    paddingHorizontal: 16, // Equivalent to Tailwind's px-4
    borderRadius: 6, // Corresponds to Tailwind's rounded-md
    backgroundColor: '#2563eb', // Corresponds to Tailwind's bg-blue-600
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24, // Spacing after last input group
  },
  signInButtonText: {
    fontSize: 14, // Corresponds to Tailwind's text-sm
    fontWeight: '500', // Corresponds to Tailwind's font-medium
    color: '#fff', // Corresponds to Tailwind's text-white
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32, // Equivalent to Tailwind's mb-8 (vertical spacing)
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4a5568', // Corresponds to Tailwind's border-t border-gray-700
  },
  dividerText: {
    paddingHorizontal: 8, // Equivalent to Tailwind's px-2
    backgroundColor: '#2d3748', // Corresponds to Tailwind's bg-gray-800
    color: '#9ca3af', // Corresponds to Tailwind's text-gray-400
    fontSize: 14, // Corresponds to Tailwind's text-sm
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10, // Equivalent to Tailwind's py-2
    paddingHorizontal: 16, // Equivalent to Tailwind's px-4
    borderWidth: 1,
    borderColor: '#4a5568', // Corresponds to Tailwind's border-gray-600
    borderRadius: 6, // Corresponds to Tailwind's rounded-md
    backgroundColor: '#4a5568', // Corresponds to Tailwind's bg-gray-700
  },
  googleIcon: {
    marginRight: 12, // Equivalent to Tailwind's mr-3
  },
  googleSignInButtonText: {
    fontSize: 14, // Corresponds to Tailwind's text-sm
    fontWeight: '500', // Corresponds to Tailwind's font-medium
    color: '#fff', // Corresponds to Tailwind's text-white
  },
  signUpPrompt: {
    marginTop: 32, // Equivalent to Tailwind's mt-8
    textAlign: 'center',
    fontSize: 14, // Corresponds to Tailwind's text-sm
    color: '#9ca3af', // Corresponds to Tailwind's text-gray-400
  },
  signUpLink: {
    fontWeight: '500', // Corresponds to Tailwind's font-medium
    color: '#3b82f6', // Corresponds to Tailwind's text-blue-500
  },
});

export default LoginScreen;
