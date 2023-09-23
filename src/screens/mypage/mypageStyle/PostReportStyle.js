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
    flex: 8,
    marginBottom: 20,
    // justifyContent: 'flex-start',
  },
  topBox: {
    // backgroundColor: 'red',

    flex: 2,
    alignItems: 'center',

    // justifyContent: 'center',
  },
  textInput: {
    // flex: 1,
    paddingTop: 0,
    marginTop: 10,
    width: width * 0.9,

    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: '#D9D9D9',
  },
  centerBox: {
    flex: 3,
    alignItems: 'center',
    // backgroundColor: 'blue',
  },

  centerContent: {
    marginTop: 5,
    paddingTop: 5,
    height: '40%',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    borderRadius: 10,
  },
  centerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: width * 0.85,
    height: '40%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  centerButton: {},
  bottomBox: {
    alignItems: 'center',
    padding: 16,

    flex: 1,
    borderRadius: 10,
    width: width * 0.9,
    marginLeft: 20,
    backgroundColor: '#D9D9D9',
  },
  buttonContainer: {
    marginTop: 40,
    borderRadius: 5,
    height: '45%',
    width: width * 0.85,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    // width: '100%',
    alignItems: 'center', // 텍스트를 수평 가운데 정렬
    justifyContent: 'center', // 텍스트를 수직 가운데 정렬
    backgroundColor: 'white',
  },
  button: {
    lineHeight: 23,
  },
})

export default styles
