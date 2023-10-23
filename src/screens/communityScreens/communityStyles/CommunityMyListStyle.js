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
    marginRight: 10,
  },
  image: {
    width: 36,
    height: 30,
    borderRadius: 50,
    flexDirection: 'row',
  },
  row: {
    marginTop: 28,
    flexDirection: 'row',
  },
  text_box: {},
  text1: {
    fontWeight: 700,
    lineHeight: 28,
    fontSize: 16,
  },
  text2: {
    fontSize: 12,
    fontWeight: 400,
  },
  ranking_background: {
    position: 'absolute',
    zIndex: 5,
    bottom: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 35,
    height: 35,
    // borderWidth: 1,
  },
  ranking_round: {
    borderWidth: 1,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,
  },
  first: { backgroundColor: 'gold' },
  second: {
    backgroundColor: 'silver',
  },
  third: {
    backgroundColor: 'bronze',
  },
  ss: {
    borderWidth: 1,
  },
  ranking_background2: {
    position: 'absolute',
    zIndex: 5,
    bottom: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 35,
    height: 35,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  ranking_round2: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,
  },
  ranking2: {
    fontWeight: 700,
    fontSize: 15,
  },
})

export default styles
