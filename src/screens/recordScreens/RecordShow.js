import React, {useEffect,useState} from 'react';
import { View, StyleSheet,Text,Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const RecordScreen = ({ navigation }) => {
  const distance = useSelector((state) => state.dist.distance);
  const walking = useSelector((state) => state.dist.walking);
  const uri = useSelector((state) => state.uriState.uri);
  const result3 = useSelector((state) => state.dist.trashcnt_percent);
  const result2 = useSelector((state)=>state.dist.trashcnt)
  const result1 = useSelector((state)=>state.dist.cnnResult)
  const stopwatch = useSelector((state) => state.stopwatch.elapsedTime);
  const [position, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const userID= useSelector((state) => state.auth.user?.clientID);
  const ip = Constants.expoConfig.extra.Local_ip;
  console.log(ip,"-----------------------------")

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
      const position = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      setLocation(position);
      })();
  }, []);

  useEffect(()=>{
    if(position){
      setData(position)
    }
    
  },[position])

  const setData = async(location) =>{
    const data = {
      clientID:userID, 
      latitude: location.latitude, 
      longitude: location.longitude, 
      walking:walking, 
      distance:distance,
      stopwatch:stopwatch,
      imageURI:uri,
      result: result3
    }
    try{
      await axios.post(`http://${ip}:3000/Record`,data)
    }catch(error){
      console.error('Record Data Error :', error)
    }
  }

  const getPoint=async()=>{
    const trashCount = result2 * result3 / 100
    var result = [25, 50, 75, 100].includes(trashCount) ? trashCount : 0;
    const data ={
      clientID: userID,
      points: result,
      event:'RecordShow',
      descript:'기록으로 인한 포인트 획득'
    }

    await axios.post(`http://${ip}:3000/point`,data)
    .catch((err)=>console.error('getPoing Error',err))

    Alert.alert(
      '포인트 획득!!',
        `${trashCount}만큼 포인트를 획득하였습니다 ^-^9`,
          [
            {
              text: '확인',
            },
          ],
    )
  }

    

  const ButtonOnPress = () => {
    // 데이터베이스에 레코드 저장 코드 추가 -> axios
    try{
      getPoint()
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
          <Paragraph style={styles.info}>
            <Text style={styles.infoLabel}>걸음 수: </Text>
            <Text style={styles.infoValue}>{walking}</Text>
          </Paragraph>
          <Paragraph style={styles.info}>
            <Text style={styles.infoLabel}>쓰레기 양: </Text>
            <Text style={styles.infoValue}>{result3}</Text>
          </Paragraph>
          <Paragraph style={styles.info}>
            <Text style={styles.infoLabel}>거리: </Text>
            <Text style={styles.infoValue}>{distance}</Text>
          </Paragraph>
          <Paragraph style={styles.info}>
            <Text style={styles.infoLabel}>시간: </Text>
            <Text style={styles.infoValue}>{stopwatch}</Text>
          </Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: uri }} style={styles.image} />
        <Card.Actions style={styles.cardActions}>
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
    borderRadius: 16,
    elevation: 4, // Add elevation for a card-like effect
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  infoValue: {
    textAlign: 'right',
  },
  image: {
    height: 300,
    marginTop: 16,
    borderRadius: 8,
  },
  cardActions: {
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007AFF',
  },
});


export default RecordScreen;
