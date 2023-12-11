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
import Svg, { Path } from 'react-native-svg'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import Background2 from '../../components/Background2'
import { useEffect } from 'react'
import axios from 'axios'
import styles from './cameraStyle/cameraSettingsStyle'
import { cameraImage } from '../../assets'

const CameraSettings = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity>
          <Text style={styles.text}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.image_box}>
<cameraImage></cameraImage>
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
