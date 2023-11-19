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
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
  timeTracking: {
    alignSelf: 'center',
    position: 'absolute',
    // top: ,
    width: '85%',
    backgroundColor: '#D9D9D966',
    borderRadius: 40,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    // marginHorizontal: 'auto',

    bottom: 550,
    zIndex: 1,
  },
  area: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeControl: {
    width: '26%',

    position: 'absolute',
    padding: 16,
    alignSelf: 'flex-end',

    // justifyContent: 'flex-end',
    bottom: 70,
    // backgroundColor: 'red',
    // justifyContent: 'center',

    zIndex: 10,
  },
})

export default styles
