import { StyleSheet, PixelRatio } from 'react-native'

const pixelRatio = PixelRatio.get()
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 2,
    top: 0,
    right: 0,

    // marginLeft: 30,
    // flex: 1,
  },

  content: {
    backgroundColor: 'white',
    width: '80%',
    position: 'absolute',
    padding: 16,
    borderRadius: 15,
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
    // top: 50,
    // right: 0,

    zIndex: 2,
  },
  button_box: {
    flexDirection: 'row',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#7bb0ff',
    width: 100,
    height: 35,
    // marginRight: 10,
    borderRadius: 10,
  },
})

export default styles
