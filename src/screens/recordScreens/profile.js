import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [note, setNote] = useState('');

  const handleEditProfile = () => {
    // 프로필 수정 로직을 여기에 작성합니다.
    // 예를 들어, 프로필 수정 화면으로 이동하는 등의 작업을 수행할 수 있습니다.

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
      <Button title="프로필 수정" onPress={handleEditProfile}/>
      <Button title="로그아웃" onPress={handleLogout} />
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

export default EditProfile;