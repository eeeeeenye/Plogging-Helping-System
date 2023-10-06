import { StyleSheet } from 'react-native'
import { theme } from '../../../core/theme'

import { Dimensions } from 'react-native'

// 화면 너비, 높이 구하는 방법
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginBottom: 100,
    marginTop: 100,
  },
  profileContainer: {
    paddingLeft: 15,
    paddingBottom: 20,
    // backgroundColor: 'red',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828080',
  },
  s: {
    flex: 2,

    // width: 100,
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  ProfileText: {
    fontSize: 20,
    // marginRight: 0,
    right: 40,
    width: width * 0.4,

    textAlign: 'center',

    lineHeight: 30,
  },

  profileInfo: {
    flex: 1,
    width: width * 0.9,
    paddingLeft: 30,

    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerContainer: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828080',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomStyle: 'solid',
  },

  centerContainer_title: {
    paddingBottom: 8,
  },
  centerContainer_title_text: {
    fontSize: 23,
    fontWeight: 600,
  },

  centerContainer_label: {
    paddingLeft: 15,
  },

  userInfoButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  userInfoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  text: {
    fontSize: 20,

    // alignSelf: 'center',
    lineHeight: 30,
  },

  settingButton: {
    marginRight: 8,
  },
  centerContainer_label2: {
    // marginBottom: 100,
    paddingLeft: 15,
  },
  centerContainer2: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828080',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomStyle: 'solid',
  },
})

export default styles
