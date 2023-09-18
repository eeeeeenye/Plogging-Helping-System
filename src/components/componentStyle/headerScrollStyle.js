import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff', // 헤더 배경색상 설정
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,

    // marginBottom: 20,
    position: 'absolute', // 헤더를 화면 상단에 고정
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2, // 다른 요소 위에 표시하려면 설정
    flexDirection: 'row',
    justifyContent: 'space-between', // 요소 사이에 공간을 동일하게 배치
    alignItems: 'center', // 요소들을 수직으로 가운데 정렬
    height: 70,

    borderBottomWidth: 0.5,
    borderBottomColor: '#828080',
  },

  // profileHeader: {
  //   backgroundColor: 'white',

  //
  //   // padding: 16,

  // },

  header_center: {
    flex: 1,
    alignItems: 'center',
  },
  header_center_text: {
    fontSize: 18,
  },

  header_right: {
    marginRight: 'auto',
  },
})

export default styles
