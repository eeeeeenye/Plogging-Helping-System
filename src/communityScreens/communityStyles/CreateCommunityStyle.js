import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const isTallScreen = height > 800

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contents: {
    flex: 1,

    // justifyContent: 'center',
    alignItems: 'center',

    marginTop: 80,
    marginBottom: 50,
  },
  community_main: {
    width: '80%',
  },
  image_box: {
    marginRight: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D94D',
    borderRadius: 20,
  },

  image: {
    // resizeMode: 'contain',
    width: 30,
    height: 31,
  },
  community: {
    flex: 1,
    // backgroundColor: 'blue',
    width: '85%',

    // marginRight: 60,
    // marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  community2: {
    flex: 1,
    // backgroundColor: 'blue',
    width: '80%',

    // marginRight: 75,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textinput: {
    fontSize: 12,
    textAlignVertical: 'center',
    backgroundColor: '#D9D9D94D',
    height: 45,
    borderRadius: 40,
  },
  date_text: {
    fontWeight: 700,

    marginRight: 45,
  },
  location: {
    fontWeight: 700,
    marginRight: 20,
  },

  main_box: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    fontSize: 12,

    height: 300,
  },
  people: {
    flex: 1,
    // backgroundColor: 'red',
    height: 30,

    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  people_text: {
    // flex: 1,
    marginLeft: 20,
    fontSize: 13,
    fontWeight: 700,
  },
  people_textInput: {
    height: 30,
    width: width * 0.2,
    textAlign: 'center',
    textAlignVertical: 30,
  },
  password: {
    flex: 1,
    height: 30,

    width: width * 0.8,
    marginTop: 20,
    // width: width * 0.8,
  },
  password_sub: {
    // flex: 1,
    height: 25,
    justifyContent: 'space-between',
    // width: width * 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  password_image: {
    // width: 15,
    // height: 15,
    // marginBottom: -15,
  },
  password_text: {
    fontSize: 13,
    marginLeft: 20,
    fontWeight: 700,
  },
  password_textInput: {
    width: width * 0.5,
    // width: width * 0.5s,
    height: 40,
  },
  button_box: {
    // height: height * 0.3,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 45,
    borderRadius: 10,
    backgroundColor: '#0094FF',
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontSize: 12,
    color: 'white',
  },
})

export default styles
