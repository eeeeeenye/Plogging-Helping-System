import { StyleSheet } from 'react-native'

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
    marginBottom: 60,
  },
  image: {
    marginRight: 15,
    width: 133,
    height: 108,
  },
  board: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  text: {
    color: 'gray',
    lineHeight: 20.8,
    fontSize: 12,
  },
  plus: {
    backgroundColor: '#E1EBFD',
    zIndex: 5,
    position: 'absolute',
    width: 52,
    height: 52,
    top: 580,
    left: 280,
    borderRadius: 50,
  },
})

export default styles
