import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile_photo from '../../components/Profile';
import { useSelector } from 'react-redux';
import { theme } from '../../core/theme'

const MyPage = () => {
  const navigation = useNavigation();
  const username = useSelector((state) => state.auth.user?.ClientName);
  const email = useSelector((state) => state.auth.user?.email);
  const phone = useSelector((state) => state.auth.user?.phone);
  const [note, setNote] = useState('잘부탁드립니다~~');

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
        <View style={styles.profileInfo}>
            <Profile_photo />
        <Text style={styles.username}>{username}</Text>
        </View>
         <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
            <Text style={styles.buttonText}>프로필 수정</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>이메일</Text>
          <Text style={styles.text}>{email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>이름</Text>
          <Text style={styles.text}>{username}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>전화번호</Text>
          <Text style={styles.text}>{phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>한줄소개</Text>
          <Text style={styles.text}>{note}</Text>
        </View>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  userInfoButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  userInfoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  
});

export default MyPage;
