import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,

    padding: 16,
  },
  contents: {
    flex: 1,
  },
  footer: {
    marginTop: 100,
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: '#828080',
    backgroundColor: 'white', // 푸터 배경색 설정
    padding: 10,
    position: 'absolute', // 푸터를 화면 하단에 고정
    bottom: 0,
    left: 0,
    right: 0,
    // height: 100,
    // zIndex: 2,
  },

  element: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    // backgroundColor: 'gray',
    // textAlign: 'center',
    width: 30,
    height: 30,
  },
  footer_container: {
    paddingLeft: 40,
    flex: 1,
    // paddinRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  footer_text: {
    marginTop: 3,
    marginLeft: 8,
    fontSize: 12,
    // color: 'red',

    // textAlign: 'center', // 푸터 텍스트 가운데 정렬
  },
  footer_text2: {
    fontSize: 12,
    marginRight: 8,
    marginTop: 3,
    // color: 'red',
    // color: 'red',

    // textAlign: 'center', // 푸터 텍스트 가운데 정렬
  },
  disabled: {
    color: 'gray',
  },
})

export default styles
