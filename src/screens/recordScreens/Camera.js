import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Camera } from 'expo-camera'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {save} from '../../slices/All/urislice'
import { trashCount, trashCount2,cnnResults } from '../../slices/All/Distanceslice'
import Constants from 'expo-constants';


const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)
  const [photoUri, setPhotoUri] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const ip = Constants.expoConfig.extra.Local_ip;
  const dispatch = useDispatch()

  // console.log(navigation.navigate('HomeMain'))

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
   
    Alert.alert(
      '쓰레기 인증',
        '쓰레기가 담긴 쓰레기 봉투를 L가 보이게 쓰레기통 전체를 촬영해주세요. 그러지 않으면 포인트를 얻기 힘들 수 있습니다.',
          [
            {
              text: '잘 알겠습니다',
            },
          ],
      )
  }, []);

  const handleCapture = async () => {

    if (cameraRef) {
      setIsLoading(true);     // 로딩 상태로 변경
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo?.uri)
      dispatch(save(photo?.uri))
      try{

        const formatData = new FormData();

        formatData.append('file',{
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const data = await axios.post(`http://${ip}:5000/detection`,formatData,{
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        });

      console.log(data.data)
      setIsLoading(false); // 로딩 상태 해제
      dispatch(trashCount(data.data?.result2));
      dispatch(trashCount2(data.data?.result3));
      dispatch(cnnResults(data.data?.result1));
      navigation.navigate('Record');
    }catch(error){
      console.error('File upload failed', error)
      setIsLoading(false); // 로딩 상태 해제

      Alert.alert(
        '재촬영',
          '사진 인식을 못하였습니다. 다시 촬영해주세요.',
            [
              {
                text: '잘 알겠습니다',
              },
            ],
      )
    }
    }
  };
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>사진을 분석 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      />
      
        <View style={{height:300}}>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  button: {
    borderRadius: 100,
    padding: 15,
    height:100,
    width:80,
    position:'absolute',
    left:170,
    top:50,
    backgroundColor:'purple',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  photoUriText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Adjust the background color to your preference
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: 'black',
  },
  
});

export default CameraScreen;
