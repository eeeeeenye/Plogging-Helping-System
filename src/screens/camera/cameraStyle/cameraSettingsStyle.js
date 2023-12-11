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
  container: {
    // zIndex: 999,
    //   backgroundColor: 'white',

    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

    // justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
  },

  image_box: {
    backgroundColor: 'white',
    borderRadius: 50,
    // borderColor:'black',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_sub: {
    backgroundColor: '#f9b0b0',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    width: 45,
    zIndex: 1,
    height: 45,
  },
  image: {
    width: 60,
    height: 25,
    // resizeMode: 'cover',
  },
})

export default styles
