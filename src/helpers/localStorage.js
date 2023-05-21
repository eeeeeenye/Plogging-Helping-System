import AsyncStorage from '@react-native-async-storage/async-storage';

const clientManager = {
    // Object Data를 한꺼번에 가져오기
    async storeData(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log(e);
        }
    },

    // JSON Data를 한꺼번에 가져오기
    async getData(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
        }
    }
};

export default clientManager;