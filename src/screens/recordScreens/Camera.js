import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants'


const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ip = Constants.expoConfig.extra.Local_ip

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
      setIsLoading(true); // 로딩 상태로 변경
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri); // 캡처된 사진의 경로를 상태로 저장

      try{
      const formatData = new FormData();

      console.log(photo.uri)
      formatData.append('file',{
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const data = await axios.post(`http://10.20.32.45:5000/detection`,formatData,{
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
      console.log(data.data);
    }catch(error){
      console.error('File upload failed', error)
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
      {photoUri ? (
        <Text style={styles.photoUriText}>Photo URI: {photoUri}</Text>
      ) : (
        <View style={{height:300}}>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
});

export default CameraScreen;
