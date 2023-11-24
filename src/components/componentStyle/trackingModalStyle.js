import { StyleSheet, PixelRatio } from 'react-native'

const pixelRatio = PixelRatio.get()
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 2,
    // flex: 1,
  },

  content: {
    backgroundColor: 'white',
    width: '80%',
    position: 'absolute',

    borderRadius: 15,
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
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
