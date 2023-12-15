import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Dimensions,
  PixelRatio,
} from 'react-native'
const pixelRatio = PixelRatio.get()
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  contents: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 999,
  },

  image: {
    marginTop: 30,

    width: '100%',
    minHeight: '80%',
  },

  footer: {
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9c9cf1',
    width: '30%',
    borderRadius: 10,
    height: 50,
  },
    addStyle: {
        backgroundColor: '#648764',

    backgroundColor: '#386c38',
  },
})

export default styles
