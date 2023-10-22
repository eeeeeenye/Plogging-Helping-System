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
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    height: height * 0.45,

    // width: '100%',
  },
  row: {
    // flex: 1,
    // backgroundColor: 'blue',

    height: height * 0.13,
    paddingLeft: 'auto',

    width: width * 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row2: {
    paddingLeft: 12,

    // backgroundColor: 'blue',

    height: height * 0.13,

    width: width * 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  wrap: {
    // flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
