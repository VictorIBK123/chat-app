import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, Keyboard } from 'react-native';
// Ensure react-native-vector-icons is installed and linked for icons
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import Foundation from 'react-native-vector-icons/Foundation';

const { width, height } = Dimensions.get('window');

// Mock data for messages
const initialMessages = [
  { id: '1', text: 'Hey there!', sender: 'other', time: '10:00 AM' },
  { id: '2', text: 'Hi! How are you?', sender: 'me', time: '10:01 AM' },
  { id: '3', text: 'I\'m good, thanks! What about you?', sender: 'other', time: '10:02 AM' }, // Fixed apostrophe
  { id: '4', text: 'Doing great! Just chilling.', sender: 'me', time: '10:03 AM' },
  { id: '5', text: 'That sounds nice. What are you up to this weekend?', sender: 'other', time: '10:05 AM' },
  { id: '6', text: 'Planning to go hiking. You?', sender: 'me', time: '10:06 AM' },
  { id: '7', text: 'Thinking of visiting some friends. Have a good hike!', sender: 'other', time: '10:07 AM' },
  { id: '9', text: 'You too! Talk soon.', sender: 'me', time: '10:08 AM' },
  { id: '8', text: 'You too! Talk soon.', sender: 'me', time: '10:08 AM' },
  { id: '10', text: 'You too! Tak soon.', sender: 'me', time: '10:08 AM' },
];

const ChatWithPerson = () => {

  // for keyboard avoiding view
  const [enabled, setEnabled] = useState(true)

  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = React.useRef<FlatList>(null);
  const contactName = "Alice Johnson"; // Example contact
  const contactStatus = "online"; // Example status

  // disable keyboard avoiding view on keyboard hide and enable on show
  useEffect(()=>{
    const showListener = Keyboard.addListener('keyboardDidShow',()=>setEnabled(true))
    const hideListener = Keyboard.addListener('keyboardDidHide',()=>setEnabled(false)) 
    return ()=>{
      showListener.remove()
      hideListener.remove()
    }
  },[])

  const sendMessage = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    if (newMessage.trim()) {
      const newMsg = {
        id: String(messages.length + 1),
        text: newMessage.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }: { item: { id: string; text: string; sender: string; time: string } }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={enabled}
      behavior={Platform.OS === 'ios' ? 'padding' :'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust as needed
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a202c" />
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
            <AntDesign name="arrowleft" color="#fff" size={24} />
        </TouchableOpacity>
        <Image source={{ uri: 'https://placehold.co/100x100/4a5568/ffffff?text=AJ' }} style={styles.profileAvatar} onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}/>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contactName}</Text>
          <Text style={styles.contactStatus}>{contactStatus}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} aria-label="Video Call">
            <Foundation name="video" color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} aria-label="Voice Call">
            <Zocial name="call" color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} aria-label="Options">
            <MaterialCommunityIcons name="dots-vertical" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Message List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageListContent}
        // inverted // To display latest messages at the bottom
      />

      {/* Message Input Area */}
      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.inputIcon} aria-label="Attach File">
          <Icon name="paperclip" size={20} color="#9ca3af" />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          placeholderTextColor="#9ca3af"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity style={styles.inputIcon} aria-label="Emoji">
          <Icon name="smile-o" size={20} color="#9ca3af" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} aria-label="Send Message">
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c', // bg-gray-900
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50, // Adjust for status bar
    paddingBottom: 12,
    backgroundColor: '#2d3748', // bg-gray-800
    borderBottomWidth: 1,
    borderBottomColor: '#4a5568', // border-gray-700
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#6b7280', // Placeholder background
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  contactStatus: {
    fontSize: 12,
    color: '#9ca3af', // text-gray-400
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
    padding: 5,
    alignSelf:'center'
  },
  messageListContent: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'flex-end', // Aligns content to the bottom
  },
  messageBubble: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'column',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb', // bg-blue-600
    borderBottomRightRadius: 2, // WhatsApp-like corner
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#4a5568', // bg-gray-700
    borderBottomLeftRadius: 2, // WhatsApp-like corner
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingBottom: 20,
    backgroundColor: '#2d3748', // bg-gray-800
    borderTopWidth: 1,
    borderTopColor: '#4a5568', // border-gray-700
  },
  inputIcon: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    maxHeight: 100, // Limit input height for multiline
    backgroundColor: '#4a5568', // bg-gray-700
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#2563eb', // bg-blue-600
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default ChatWithPerson;
