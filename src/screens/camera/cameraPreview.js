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

const CameraSettings = ({ navigation, closeModal }) => {
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

