import React from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
const viewWidth = 200
const viewHeight = 100
const { width, height } = Dimensions.get('window')

const left = (width - viewWidth) / 2
const top = (height - viewHeight) / 2
const ImageWithText = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    backgroundColor: 'red',
    left: 20,
    top: 20,
    position: 'absolute',
    marginTop: 10, // 텍스트의 상단 간격 조정
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ImageWithText
