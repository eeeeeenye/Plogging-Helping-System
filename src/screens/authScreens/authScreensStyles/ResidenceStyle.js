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

    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // justifyContent: 'flex-start',
  },
  box: {
    padding: 16,
    borderWidth: 1,
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: 10,
  },
  search_box: {
    flexDirection: 'row',
  },
  search_text: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 15,
  },
  line: {
    marginTop: 10,
    borderWidth: 1,
    //     width: width * 0.6,
    //     height: 50,
  },
})

export default styles
