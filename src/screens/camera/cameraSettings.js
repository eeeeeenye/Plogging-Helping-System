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
import CameraImage from '../../assets/svgImages/CameraImage.svg'
import Rotate from '../../assets/svgImages/rotate-ccw.svg'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import Background2 from '../../components/Background2'
import { useEffect } from 'react'
import axios from 'axios'
import styles from './cameraStyle/cameraSettingsStyle'
import { Camera } from 'expo-camera'

const CameraSettings = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity>
          <Rotate></Rotate>
          {/* <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="white"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="feather feather-camera"
            // {...props}
          >
            <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <Circle cx={12} cy={13} r={4} />
          </Svg> */}
          <Text style={styles.text}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.image_box}>
          <View style={styles.image_sub}></View>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Svg
            style={styles.image}
            source={require('../../assets/rotate-cw.svg')}
          ></Svg> */}
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Svg
            style={styles.image}
            source={require('../../assets/rotate-ccw.svg')}
          ></Svg> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CameraSettings
