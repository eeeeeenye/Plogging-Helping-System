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
  image: {
    marginRight: 15,
    width: 133,
    height: 108,
  },
  board: {
    width: width * 1,

    padding: 16,
    paddingLeft: 30,
    marginRight: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  text: {
    color: 'gray',
    lineHeight: 20.8,
    fontSize: 12,
  },

  createButton: {
    // zIndex: 5,

    // flex: 0.08,
    backgroundColor: '#E1EBFD',
    // position: 'relative',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    bottom: isTallScreen ? '11%' : '14%',
    left: '80%',
    // left: responsiveWidth,
    // top: 150,
  },
  //   plus:{}
  //   round: {
  //

  //   },
  plus: {
    width: 28,
    height: 22,
    resizeMode: 'contain',
  },
  touch: {
    width: 52,
    height: 52,
    borderRadius: 50,
    // backgroundColor: 'red',
  },
})

export default styles
