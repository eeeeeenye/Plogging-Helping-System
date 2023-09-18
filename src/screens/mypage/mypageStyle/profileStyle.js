import { StyleSheet, Dimensions } from 'react-native'
import { theme } from '../../../core/theme'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 50,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    // flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  textContent: {
    // width: width * 0.6,

    marginTop: 10,
    // marginLeft: 80,
    // marginRight: 50,
  },
  textContainer: {
    // textAlign: 'left',
    flexDirection: 'row', // 수평으로 배치
    // alignItems: 'center', // 가운데 정렬
    marginBottom: 10,

    marginLeft: 60,
    marginRight: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,

    textAlign: 'center',
  },
  label: {
    fontSize: 15,
  },
  text: {
    textAlignVertical: 'center',
    // flex: 4,
    textAlign: 'left',
    // flex
    lineHeight: 23,

    fontSize: 15,

    marginLeft: 15,
  },

  buttonContainer: {
    // marginTop: 10,
    width: width * 0.75,
  },
  button: {
    justifyContent: 'center', // 버튼 내의 요소들을 수직으로 가운데 정렬
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    height: 50,
    backgroundColor: '#379DF1',
  },
  buttonText: {
    textAlign: 'center',
    lineHeight: 23,
    color: 'white',

    fontSize: 20,
  },
})
export default styles
