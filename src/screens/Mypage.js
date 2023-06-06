import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile_photo from '../../components/Profile';

const MyPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [note, setNote] = useState('');

  const handleProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const handlePointInquiry = () => {
    // 포인트 조회
  };

  const handleRecordHistory = () => {
    // 기록물 내역
  };

  const handleServicePolicy = () => {
    // 서비스 정책
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile_photo />
      </View>
      
      <Button title="프로필 수정" onPress={handleProfile} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>사용자명:</Text>
        <Text style={styles.text}>{username}</Text>

        <Text style={styles.label}>이메일:</Text>
        <Text style={styles.text}>{email}</Text>

        <Text style={styles.label}>이름:</Text>
        <Text style={styles.text}>{name}</Text>

        <Text style={styles.label}>전화번호:</Text>
        <Text style={styles.text}>{number}</Text>

        <Text style={styles.label}>한줄소개:</Text>
        <Text style={styles.text}>{note}</Text>
      </View>

      

      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.userInfoButton} onPress={handlePointInquiry}>
          <Text style={styles.userInfoButtonText}>포인트 조회</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfoButton} onPress={handleRecordHistory}>
          <Text style={styles.userInfoButtonText}>기록물 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfoButton} onPress={handleServicePolicy}>
          <Text style={styles.userInfoButtonText}>서비스 정책</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop:20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userInfo: {
    marginTop: 20,
  },
  userInfoButton: {
    backgroundColor: '#00AAFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  userInfoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
});

export default MyPage;
