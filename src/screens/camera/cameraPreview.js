import React from 'react'
import { toggleImageClick } from '../../slices/All/footerSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import Background2 from '../../components/Background2'
import { useEffect } from 'react'
import axios from 'axios'
import {
  setCameraOn,
  setCameraType,
  setPreviewVisible,
  setCameraImage,
} from '../../slices/All/cameraSlice'
import styles from './cameraStyle/cameraPreviewStyle'
import { Camera, CameraType } from 'expo-camera'

const CameraPreview = () => {
  const dispatch = useDispatch()

  const cameraImage = useSelector((state) => state.camera.cameraImages)
  console.log(cameraImage, 'cameraIamge')
  const retakePictureHandler = () => {
    dispatch(setPreviewVisible(false))
    dispatch(setCameraImage(null))
  }

  return (
    <View style={styles.contents}>
      <Image source={{ uri: cameraImage }} style={styles.image} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={retakePictureHandler}
        >
          <Text style={{ fontSize: 15, color: 'white' }}>다시찍기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.addStyle]}>
          <Text style={{ fontSize: 15, color: 'white' }}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CameraPreview
