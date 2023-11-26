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

  modal_container: {
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

  modal_content: {
    
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
    width:'90%',
    // backgroundColor:'red',
    marginTop:5,
    justifyContent:'space-between'
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
