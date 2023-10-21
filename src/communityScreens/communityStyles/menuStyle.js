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
    flex: 2,
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    height: height * 0.6,

    backgroundColor: 'blue',

    // width: '100%',
  },
  content2: {
    flex: 1,

    height: height * 0.1,
    backgroundColor: 'red',
    marginHorizontal: 'auto',

    width: width * 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrap: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
