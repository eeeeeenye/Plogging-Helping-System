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

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 100,
    marginBottom: 50,
  },

  image_box: {
    marginRight: 15,
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
    width: '70%',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textinput: {
    fontSize: 15,
    textAlignVertical: 'center',

    outerWidth: 0,
    backgroundColor: '#D9D9D94D',
    borderWidth: 2,
    borderColor: 'white',
    height: 35,
    borderRadius: 15,
  },
})

export default styles
