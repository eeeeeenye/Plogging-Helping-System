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
    backgroundColor: 'white',

    // flex: 1,
  },
  content: {
    marginTop: 70,
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',

    // justifyContent: 'flex-start',
  },
  postcode: {
    width: width * 1,
    height: height * 1,
  },
})

export default styles
