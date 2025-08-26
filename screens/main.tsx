import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
// Ensure react-native-vector-icons is installed and linked for icons
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// Mock data for chat list
const chatData = [
  {
    id: '1',
    name: 'Alice Johnson',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    avatar: 'https://placehold.co/100x100/4a5568/ffffff?text=AJ', // Placeholder image
    unreadCount: 3, // Added unread message count
  },
  {
    id: '2',
    name: 'Bob Williams',
    lastMessage: 'Can we meet tomorrow?',
    time: 'Yesterday',
    avatar: 'https://placehold.co/100x100/3b82f6/ffffff?text=BW',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    lastMessage: 'Got it, thanks!',
    time: 'Mon',
    avatar: 'https://placehold.co/100x100/6b7280/ffffff?text=CB',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Diana Prince',
    lastMessage: 'Don\'t forget the meeting.',
    time: 'Sun',
    avatar: 'https://placehold.co/100x100/f9a8d4/ffffff?text=DP',
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Eve Adams',
    lastMessage: 'Sounds good!',
    time: 'Sat',
    avatar: 'https://placehold.co/100x100/a78bfa/ffffff?text=EA',
    unreadCount: 5,
  },
  {
    id: '6',
    name: 'Frank Miller',
    lastMessage: 'See you there.',
    time: 'Fri',
    avatar: 'https://placehold.co/100x100/d97706/ffffff?text=FM',
    unreadCount: 0,
  },
  {
    id: '7',
    name: 'Grace Lee',
    lastMessage: 'Call me later.',
    time: 'Thurs',
    avatar: 'https://placehold.co/100x100/fca5a5/ffffff?text=GL',
    unreadCount: 2,
  },
];

const Main = () => {
  // Render each chat item in the list
  const renderChatItem = ({ item }:{item:{id: string, name: string, lastMessage: string, time: string, avatar: string, unreadCount: number}}) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}/>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        
      </View>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appName}>ViChat</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} aria-label="Search">
            <Icon name="search" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} aria-label="Options">
            <Icon name="ellipsis-v" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatListContent}
      />
    </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50, // Adjust for status bar
    paddingBottom: 12,
    backgroundColor: '#2d3748', // bg-gray-800
    borderBottomWidth: 1,
    borderBottomColor: '#4a5568', // border-gray-700
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
    padding: 5,
  },
  chatListContent: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#4a5568', // Light border for separation
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width/height for a perfect circle
    marginRight: 12,
    backgroundColor: '#6b7280', // Placeholder background
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  chatTime: {
    fontSize: 12,
    color: '#9ca3af', // text-gray-400
  },
  lastMessage: {
    fontSize: 14,
    color: '#cbd5e0', // text-gray-300
  },
  unreadBadge: {
    backgroundColor: '#2563eb', // A blue badge color
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 10, // Space from the message
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Main;
