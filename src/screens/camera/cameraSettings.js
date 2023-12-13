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
import { setCameraOn, setCameraType } from '../../slices/All/cameraSlice'
import styles from './cameraStyle/cameraSettingsStyle'
import { Camera, CameraType } from 'expo-camera'

const CameraSettings = ({ navigation, closeModal, takePictureHandler }) => {
  const dispatch = useDispatch()
  const cameraType = useSelector((state) => state.camera.cameraType)

  const backCamera = () => {
    //backCamera사용시
    closeModal()
    dispatch(setCameraOn(false))
  }
  const rotateCamera = () => {
    console.log('카메라타입')
    dispatch(setCameraType(CameraType.front))
    if (cameraType === 'front') {
      dispatch(setCameraType(CameraType.back))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.content}>
          <TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={backCamera}
          >
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={takePictureHandler}
            style={styles.image_box}
          >
            <View style={styles.image_sub}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="feather feather-camera"
                // {...props}
              >
                <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <Circle cx={12} cy={13} r={4} />
              </Svg>
            </View>
          </TouchableOpacity>

          {cameraType === 'front' ? (
            <TouchableOpacity
              onPress={rotateCamera}
              style={{ width: 30, height: 30 }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="feather feather-rotate-ccw"
              >
                <Path d="M1 4v6h6" />
                <Path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </Svg>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={rotateCamera}
              style={{ width: 30, height: 30 }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="feather feather-rotate-cw"
              >
                <Path d="M23 4v6h-6" />
                <Path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </Svg>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default CameraSettings
