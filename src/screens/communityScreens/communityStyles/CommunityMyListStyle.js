import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const isTallScreen = height > 800

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 100,
    marginBottom: 50,
  },
  image_box: {
    marginRight: 15,
  },
  image: {
    width: 84,
    height: 80,
    // borderRadius: 50,
    flexDirection: 'row',
  },
  row: {
    width: width * 0.8,
    marginTop: 28,
    flexDirection: 'row',
  },
  line: { lineHeight: 20 },

  title: { lineHeight: 20, fontWeight: 700, fontSize: 15 },
  tag: {
    fontSize: 13,
  },
  members: { fontSize: 14 },
  date: {
    fontSize: 12,
  },
})

export default styles
