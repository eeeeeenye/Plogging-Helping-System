import { StyleSheet } from 'react-native'
import { theme } from '../../../core/theme'

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
    borderBottomWidth: 0.5,
    borderBottomColor: '#828080',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 30,
    marginRight: 20,
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
    lineHeight: 30,
  },

  settingButton: {
    marginRight: 8,
    // backgroundColor: 'red',
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
