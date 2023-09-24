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
    flex: 1,
    marginTop: 95,
    justifyContent: 'center',
    alignItems: 'center',
  },

  report: {
    padding: 16,
    borderBottomColor: '#828080',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    marginRight: 10,
    height: 100,
  },

  reportContainer: {
    lineHeight: 30,

    paddingTop: 15,
  },
  boolean: {
    lineHeight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    lineHeight: 20,
    fontSize: pixelRatio * 4,
    color: 'gray',
  },
  text2: {
    lineHeight: 25,
    color: 'gray',
  },

  booleanText: {
    marginRight: 40,
    color: 'gray',
  },
  booleanText2: {
    marginRight: 5,
    color: 'gray',
  },
})

export default styles
