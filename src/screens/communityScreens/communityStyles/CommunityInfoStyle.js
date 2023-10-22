import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')

const isTallScreen = height > 800
const pixelDensity = PixelRatio.get()
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,

    marginTop: 70,
    marginBottom: 60,
    // width: '100%',

    // width: '100%',
  },
  image_box: {
    flex: 1,
    // backgroundColor: 'blue',
    width: width * 1,
    height: height * 0.2,
  },
  image: {
    // resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  title_text: {
    fontWeight: 600,
    fontSize: 4.5 * pixelDensity,
  },
  date_text: {
    fontSize: 3.5 * pixelDensity,
  },
  title_box: {},

  center: {
    padding: 16,
  },
  small_image: {
    resizeMode: 'contain',
    width: 16,
    marginRight: 10,
    height: 17,
  },
  small_box: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  under_text: {
    marginLeft: 25,
    fontSize: 3.5 * pixelDensity,
    color: 'gray',
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#828080',
  },
  introduce: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  introduce_text: {
    width: '75%',
  },

  human: {
    marginRight: 15,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    marginTop: 25,
  },
  button_box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    width: 14,
    height: 14,
    marginRight: 5,
    top: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.39,
    height: height * 0.06,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#00000080',
    // backgroundColor: 'red',
    marginLeft: 15,
    marginRight: 15,
  },

  button_box2: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakao_button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: height * 0.05,
    width: width * 0.3,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#FAFF00',
  },
  register_button: {
    height: height * 0.05,
    width: width * 0.38,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

    backgroundColor: '#0094FF',
  },
})

export default styles
