import { StyleSheet } from 'react-native'
import { theme } from '../../../core/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
  },
  contents: {
    flex: 10,
  },
  topContainer: {
    flex: 1,
    padding: 10,

    backgroundColor: theme.colors.pointHistory,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderBottom,
  },
  topContainer_title_text: {
    lineHeight: 31.5,
    paddingBottom: 40,
    fontSize: 25,
    fontWeight: 'bold',
  },
  topContainer_point: {
    justifyContent: 'flex-end', // 수평 정렬을 오른쪽으로
    alignItems: 'flex-end',
    flexDirection: 'row',
    // marginBottom: 20,
  },
  topContainer_point_text: {
    fontSize: 25,
    marginRight: 10,
    fontWeight: 'bold',
  },

  image: {
    width: 32,
    height: 32,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
  },

  description: {
    fontSize: 23,
    fontWeight: 'bold',
    // marginBottom: 8,
  },
  infoContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  infoContainer2: {},
  event: {
    paddingLeft: 25,
    fontSize: 23,
    color: 'black',
  },
  createdAt: {
    fontSize: 14,
    color: '#888',
  },
  points: {
    marginRight: 'auto',
    fontSize: 20,
    fontWeight: 500,
    color: '#65BC49',
  },
  flatListContainer: {
    flex: 3, // FlatList가 3부분을 차지
    backgroundColor: 'white', // 예시 색상
  },
})

export default styles
