import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const pixelRatio = PixelRatio.get()
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,

    backgroundColor: '#fff',
  },
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    fontSize: 40,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  text: {
    fontSize: 6 * pixelRatio,
  },
})
export default styles
