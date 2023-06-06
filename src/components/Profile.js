import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Profile_photo() {
  return <Image source={require('../assets/profile_photo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
})