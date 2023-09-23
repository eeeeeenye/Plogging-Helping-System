import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
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
    position: 'absolute',
  },
  dateValue: {
    top: 130,
    left: 75,
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
