import AsyncStorage from '@react-native-async-storage/async-storage'

const StatusManager = {
  // Object Data를 한꺼번에 가져오기
  async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e)
    }
  },

  // JSON Data를 한꺼번에 가져오기
  async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key)

      console.log(JSON.parse(jsonValue), 'jsonValue')
      //   return jsonValue !== null ? JSON.parse(jsonValue) : null
      return 1
    } catch (e) {
      //   console.log(e)
    }
  },

  // 모든 키 가져오기
  async getAllKeys() {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch (e) {
      // read key error
    }

    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  },

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key)
      console.log(`"${key}"가 삭제되었습니다.`)
    } catch (error) {
      console.error('데이터 삭제 중 오류 발생:', error)
    }
  },
}

export default StatusManager
