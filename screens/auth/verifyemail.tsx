import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Keyboard, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Ensure react-native-vector-icons is installed and linked for icons
import Icon from 'react-native-vector-icons/FontAwesome';
import UseVerifyEmail from '../../custom_hooks/network_requests/useverifyemail';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Toast from 'react-native-toast-message';
import UseResendCode from '../../custom_hooks/network_requests/useresendcode';
const { width } = Dimensions.get('window');
type VerifyEmailType = StackScreenProps<RootStackParamList, 'VerifyEmailScreen'>

const VerifyEmailScreen: React.FC<VerifyEmailType> = ({route, navigation}) => {
    // for the keyboardavoiding view
    const [enable, setEnable] = useState<boolean>(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(60);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const codeLength: number = 6
  const email = route.params.email

  const handleCodeChange = async (text: string)=> {
    // Only allow digits and limit length
    const numericText: string = text.replace(/[^0-9]/g, '');
    setVerificationCode(numericText.slice(0, codeLength));
    if (numericText.length === codeLength) {
      Keyboard.dismiss(); // Dismiss keyboard when code is complete
      setVerifying(true)
      const responseData = await UseVerifyEmail(email,numericText )
      setVerifying(false)
      if (responseData.success){
        Toast.show({
          type: 'success',
          text1: 'Email verified successfully',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
      else if(!responseData.success){
        Toast.show({
          type: 'error',
          text1: responseData.message,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
      else{
        Toast.show({
          type: 'error',
          text1: responseData,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        })
      }
    }
  };



  const handleResendCode = async () => {
    const responseData = await UseResendCode(email)
    console.log(responseData)
    setVerificationCode('')
    if (responseData.success){
      Toast.show({
        type: 'success',
        text1: 'Verification code resent to your email',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
    else if(!responseData.success){
      Toast.show({
        type: 'error',
        text1: responseData.message,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
    else{
      Toast.show({
        type: 'error',
        text1: responseData,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
    }

  };

  useEffect(()=>{
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setEnable(true); // or some other action
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setEnable(false); // or some other action
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  })

  useEffect(()=>{
    const interval = setInterval(() => {
      setTimeLeft((prev: number)=>{
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        return 0
        
      })
      
    }, 1000);
    return () => clearInterval(interval);
  },[])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#1a202c"}} >
        <StatusBar barStyle="light-content" backgroundColor="#1a202c" /> 
    <KeyboardAvoidingView
    enabled={enable}
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <Text style={styles.title}>
          Enter Verification Code
        </Text>
        <Text style={styles.subtitle}>
          A {codeLength}-digit code has been sent to your email. Please enter it below to verify your account.
        </Text>

        {/* Verification Code Input */}
        <View style={styles.codeInputContainer}>
          {Array(codeLength).fill(0).map((_, index: number) => (
            <TextInput
              key={index}
              style={styles.codeDigitInput}
              maxLength={1} // Each visual input takes one digit
              keyboardType="numeric"
              value={verificationCode[index] || ''}
              onChangeText={(text: string) => {
                const newCodeArray: string[] = verificationCode.split('');
                newCodeArray[index] = text;
                handleCodeChange(newCodeArray.join(''));
                // Auto-focus next input (simple logic for single TextInput model)
                // In a real multi-TextInput setup with refs, you'd focus the next ref here
              }}
              onKeyPress={({ nativeEvent }: { nativeEvent: any }) => { // Type for nativeEvent
                if (nativeEvent.key === 'Backspace' && !verificationCode[index] && index > 0) {
                  // In a real multi-TextInput setup, you'd focus previous ref and delete
                }
              }}
              caretHidden={true} // Hide caret to make it look like multiple inputs
            />
          ))}
          {/* A single invisible TextInput to handle the full code for actual logic */}
          <TextInput
            style={styles.hiddenFullInput}
            value={verificationCode}
            onChangeText={handleCodeChange}
            maxLength={codeLength}
            keyboardType="numeric"
            autoFocus // Automatically focus the main input
          />
        </View>

        {verifying && <ActivityIndicator size="large" color="#3b82f6" animating={verifying} style={{ marginBottom: 10 }} />}

        <TouchableOpacity onPress={handleResendCode}>
          <Text style={styles.resendLink}>
            Didn't receive the code? <Text style={styles.resendLinkBold}>{timeLeft==0?'Resend code': timeLeft}</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backToLoginButton}>
          <Text style={styles.backToLoginText} onPress={()=>navigation.navigate('LoginScreen')}>
           Go to Login <Icon name="arrow-right" size={16} color="#3b82f6" />
          </Text>
        </TouchableOpacity>
        <Toast />
    </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3748', // bg-gray-900
    alignItems: 'center',
    paddingHorizontal:20,
    justifyContent:'center'
  },
  card: {
    backgroundColor: '#2d3748', // bg-gray-800
    padding: 32,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
    borderColor: '#4a5568', // border-gray-700
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#cbd5e0', // text-gray-300
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative', // For absolute positioning of hidden input
    marginTop:40
  },
  codeDigitInput: {
    width: 45,
    height: 55,
    backgroundColor: '#4a5568', // bg-gray-700
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6b7280', // border-gray-600
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 4,
    fontWeight: 'bold',
  },
  hiddenFullInput: {
    position: 'absolute',
    width: '100%', // Cover the visual inputs
    height: '100%',
    opacity: 0, // Make it invisible
    // This allows the single TextInput to capture all input and manage state
    // while the individual `codeDigitInput` elements display the `verificationCode`'s individual characters
  },
  verifyButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#2563eb', // bg-blue-600
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  resendLink: {
    fontSize: 14,
    color: '#cbd5e0',
    marginBottom: 32,
  },
  resendLinkBold: {
    fontWeight: 'bold',
    color: '#3b82f6', // text-blue-500
  },
  backToLoginButton: {
    marginTop: 20,
    padding: 10,
  },
  backToLoginText: {
    fontSize: 16,
    color: '#3b82f6', // text-blue-500
    fontWeight: '500',
  },
});

export default VerifyEmailScreen;
