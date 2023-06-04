import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [note, setNote] = useState('');

  const handleProfile = () => {
  };

  return (
    <View style={styles.container}>
      <Button title="프로필 보기" onPress={handleProfile} />
-
      <Text style={styles.title}>포인트 조회</Text>
      <Text style={styles.title}>기록물 내역</Text>
      <Text style={styles.title}>서비스 정책</Text>

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
