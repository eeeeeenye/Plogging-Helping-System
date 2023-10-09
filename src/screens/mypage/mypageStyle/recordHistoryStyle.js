import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const viewWidth = 200
const viewHeight = 100

const left = (width - viewWidth) / 2
const top = (height - viewHeight) / 2
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,

    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 108,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,

    marginLeft: 20,
  },
  date: {
    // top: 20,
    // zIndex: 50,
    // top: top,

    left: left,
  },
  dateValue: {
    top: 170,
    left: 105,
    // backgroundColor: 'red',
    position: 'absolute',
    lineHeight: 17.45,
    fontSize: 15,
    color: '#FFFFFF',
  },

  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
    height: height * 0.25,

    borderWidth: 1,
    width: width * 0.9,
    borderColor: '#ddd',
  },

  imageContainer: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    marginBottom: -5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    marginBottom: -5,
    fontSize: 16,
  },
  image: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 8,
  },
})
export default styles
