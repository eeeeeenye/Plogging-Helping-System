import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')

const isTallScreen = height > 800
const pixelDensity = PixelRatio.get()
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,

    marginTop: 70,
    marginBottom: 60,
    // width: '100%',

    // width: '100%',
  },
})

export default styles
