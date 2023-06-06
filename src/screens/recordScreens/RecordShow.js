import React, {useEffect,useState} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants'
import * as Location from 'expo-location';

const RecordScreen = ({ navigation }) => {
  const distance = useSelector((state) => state.dist.distance);
  const walking = useSelector((state) => state.dist.walking);
  const uri = useSelector((state) => state.uriState.uri);
  const trashcnt = useSelector((state) => state.dist.trashcnt);
  const stopwatch = useSelector((state) => state.stopwatch.elapsedTime);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const userID= useSelector((state) => state.auth.user?.clientID);
  const ip = Constants.manifest.Local_ip;

  console.log(userID)

  useEffect(() => {
    // 위치 정보 요청 권한 확인
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치 정보 권한을 허용해주세요.');
        return;
      }

      // 위치 정보 가져오기
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      })();
  }, []);

  useEffect(()=>{
    setData()
  },[location])

  const setData = async() =>{
    const data = {
      Client_id:userID, 
      latitude: location.latitude, 
      longitude: location.longitude, 
      walking:walking, 
      distance:distance,
      stopwatch:stopwatch,
      imageURI:uri,
      result: trashcnt
    }

    try{
      await axios.post(`http://${ip}:3000/Record`,data)
    }catch(error){
      console.error('Record Data Error :', error)
    }
  }

  const ButtonOnPress = async () => {
    // 데이터베이스에 레코드 저장 코드 추가 -> axios
    try{
      // await axios.post(`http://${ip}:3000/Record`,)
      navigation.navigate('TabNav');
    }catch(error){
      console.error(error)
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>기록정보</Title>
          <Paragraph style={styles.info}>걸음 수: <Text style={styles.infoValue}>{walking}</Text></Paragraph>
          <Paragraph style={styles.info}>쓰레기 양: <Text style={styles.infoValue}>{trashcnt}</Text></Paragraph>
          <Paragraph style={styles.info}>거리: <Text style={styles.infoValue}>{distance}</Text></Paragraph>
          <Paragraph style={styles.info}>시간: <Text style={styles.infoValue}>{stopwatch}</Text></Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: uri }} style={styles.image} />
        <Card.Actions>
          <Button onPress={ButtonOnPress} mode="contained" style={styles.button}>
            확인
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '80%',
    padding: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  infoValue: {
    textAlign: 'right',
  },
  image: {
    height: 300,
    marginTop: 16,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007AFF',
  },
});

export default RecordScreen;
