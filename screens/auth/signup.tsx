import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// To use icons, you'll need to install react-native-vector-icons:
// npm install react-native-vector-icons
// For iOS, after installation: npx react-native link react-native-vector-icons and then cd ios && pod install && cd ..
// For Android, you'll need to follow the specific linking instructions from their documentation.
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');
type SignupScreenProps = StackScreenProps<RootStackParamList, 'SignupScreen'>
const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Create Account! 
        </Text>

        {/* Email and Password Sign Up Section */}
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
                placeholder="yourname@example.com"
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Confirm Password
            </Text>
            <View style={styles.inputWrapper}>
              {/* Lock icon for confirm password */}
              <Icon name="lock" size={20} color="#9ca3af" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                aria-label="Confirm Password"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>
              Sign Up
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

        {/* Social Sign Up Section */}
        <TouchableOpacity style={styles.googleSignUpButton}>
          {/* Google icon */}
          <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
          <Text style={styles.googleSignUpButtonText}>
            Sign up with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.signInPrompt}>
          Already have an account?{' '}
          <Text suppressHighlighting={true} style={styles.signInLink} onPress={()=>navigation.navigate('LoginScreen')}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c', // bg-gray-900
    alignItems: 'center',
  },
  card: {
    justifyContent:'center',
    backgroundColor: '#2d3748', // bg-gray-800
    padding: 32, // p-8
    borderRadius: 8, // rounded-lg
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
    height:'100%',
    maxWidth: 400, // max-w-md
    borderColor: '#4a5568', // border-gray-700
    borderWidth: 1,
  },
  title: {
    fontSize: 28, // text-3xl
    fontWeight: '800', // font-extrabold
    textAlign: 'center',
    color: '#fff', // text-white
    marginBottom: 32, // mb-8
  },
  inputSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24, // Spacing between input fields
  },
  label: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: '#cbd5e0', // text-gray-300
    marginBottom: 8, // mb-2
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6, // rounded-md
    borderWidth: 1,
    borderColor: '#4a5568', // border-gray-600
    backgroundColor: '#4a5568', // bg-gray-700
  },
  icon: {
    paddingLeft: 12, // pl-3
    paddingRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10, // py-2
    color: '#fff', // text-white
    fontSize: 14, // sm:text-sm
    height: 40,
  },
  signUpButton: {
    width: '100%',
    paddingVertical: 10, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 6, // rounded-md
    backgroundColor: '#2563eb', // bg-blue-600
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpButtonText: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: '#fff', // text-white
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4a5568', // border-t border-gray-700
  },
  dividerText: {
    paddingHorizontal: 8, // px-2
    backgroundColor: '#2d3748', // bg-gray-800
    color: '#9ca3af', // text-gray-400
    fontSize: 14, // text-sm
  },
  googleSignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10, // py-2
    paddingHorizontal: 16, // px-4
    borderWidth: 1,
    borderColor: '#4a5568', // border-gray-600
    borderRadius: 6, // rounded-md
    backgroundColor: '#4a5568', // bg-gray-700
  },
  googleIcon: {
    marginRight: 12, // mr-3
  },
  googleSignUpButtonText: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: '#fff', // text-white
  },
  signInPrompt: {
    marginTop: 32, // mt-8
    textAlign: 'center',
    fontSize: 14, // text-sm
    color: '#9ca3af', // text-gray-400
  },
  signInLink: {
    fontWeight: '500', // font-medium
    color: '#3b82f6', // text-blue-500
  },
});

export default SignupScreen;
