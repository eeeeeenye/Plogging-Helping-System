import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [note, setNote] = useState('');

  const handleEditProfile = () => {
    // 수정 완료된 데이터를 바탕으로 프로필 표시하는 로직 설정(바뀐 데이터로 프로필 다시 들어감)

  };


  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>닉네임 :</Text>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.label}>이메일 :</Text>
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.label}>전화번호 :</Text>
      <Text style={styles.text}>{number}</Text>
      <Text style={styles.label}>한줄소개 :</Text>
      <Text style={styles.text}>{note}</Text>
      <Button title="프로필 저장" onPress={handleEditProfile}/>
    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Profile;
