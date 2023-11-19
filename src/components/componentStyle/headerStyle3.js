import { StyleSheet, PixelRatio } from 'react-native'

const pixelRatio = PixelRatio.get()
const styles = StyleSheet.create({
  container: {
    zIndex: 50,
  },
  header: {
    height: 80,
    backgroundColor: 'white', // 헤더 배경색상 설정
    // paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    // marginBottom: 20,
    position: 'absolute', // 헤더를 화면 상단에 고정
    top: 0,
    left: 0,
    right: 0,
    // zIndex: 2, // 다른 요소 위에 표시하려면 설정
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // 요소 사이에 공간을 동일하게 배치
    alignItems: 'center', // 요소들을 수직으로 가운데 정렬

    borderBottomWidth: 0.5,
    borderBottomColor: '#828080',
  },

  headerLeft: {
    // marginLeft: 5,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 6 * pixelRatio,
  },

  headerRight: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end', // 수평으로 오른쪽으로 정렬
    alignItems: 'center',
    // top: 150,
  },
  image: {
    marginLeft: 5,
    width: 40,
    height: 40,
  },
  // settingButton: {
  //   marginLeft: 'auto',
  // },
  image2: {
    marginRight: 15,
    resizeMode: 'contain',
    width: 21,
    height: 21,
  },
  topText_box: {
    // flexDirection: 'column',
    position: 'absolute',
    top: 68,
    marginLeft: 30,
    // lineHeight: 38,
    zIndex: 10,
  },
  topText: {
    color: 'gray',
    fontSize: pixelRatio * 3,
  },
})

export default styles
