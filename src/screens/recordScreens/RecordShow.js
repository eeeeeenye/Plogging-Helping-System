import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { useSelector } from 'react-redux';

const RecordScreen = ({ navigation }) => {
    const distance = useSelector((state) => state.dist.distance);
    const walking = useSelector((state) => state.dist.walking);
    const trashcnt = useSelector((state) => state.dist.trashcnt);
    const imgURI = useSelector((state) => state.uriState.uri);
    const stopwatch = useSelector((state)=> state.stopwatch.elapsedTime);

    //location 값 추가, 회원 ID 코드 수정

    const ButtonOnpress=()=>{
        //데이터베이스에 레코드 저장 코드 추가 -> axios
        navigation.navigator("dashboard")
     }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imgURI }} style={styles.image} />
      <Text style={styles.text}>걸음 수: {walking}</Text>
      <Text style={styles.text}>쓰레기 양: {trashcnt}</Text>
      <Text style={styles.text}>거리: {distance}</Text>
      <Button onPress={ButtonOnpress}> 확인 </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RecordScreen;

