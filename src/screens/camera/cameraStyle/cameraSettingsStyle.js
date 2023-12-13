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
    // backgroundColor: 'white',

    flex: 1,
  },
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    width: width * 0.7,

    // backgroundColor: 'blue',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: 200,

    // height: 100,
    // marginHorizontal: 40,
    // marginVertical: 50,
    // margin: 'auto',

    // justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },

  image_box: {
    // paddingTop:50,

    backgroundColor: 'white',
    borderRadius: 50,
    // borderColor:'black',
    marginBottom: 30,
    // marginTop: 400,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_sub: {
    backgroundColor: '#f9b0b0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
