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
    marginTop: 80,
    marginBottom: 70,

    flex: 1,
  },

  post: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#828080',
    backgroundColor: '#D9D9D94D',
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15,
  },
  imageBox: {
    paddingHorizontal: 15,
  },
  image: { width: 84, height: 80, bottom: 5 },
  buttonContainer: {
    // flex: 1,
    width: width * 1,
    // marginTop: 20,
    flexDirection: 'row',

    backgroundColor: '#D9D9D980',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#828080',

    borderTopWidth: 0.5,
    borderTopColor: '#828080',
  },
  titleText: {
    fontSize: 5 * pixelRatio,
    fontWeight: 700,
  },
  text: {
    fontSize: 4.5 * pixelRatio,
  },
  tagText: {
    fontSize: 4 * pixelRatio,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    // height: '50%',
    // backgroundColor: 'red',
    paddingVertical: 10,
    // height: height * 0.05,
    width: width * 0.5,
  },
  separator: {
    width: 0.5,
    height: '100%',
    backgroundColor: '#828080',
  },
})

export default styles
