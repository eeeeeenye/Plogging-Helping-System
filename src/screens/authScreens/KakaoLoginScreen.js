import React from 'react'
import { WebView } from 'react-native-webview'
import { View } from 'react-native'
import axios from 'axios'
import qs from 'qs'

// const path = require('path')
// const dotenv = require('dotenv')
// dotenv.config({path: path.resolve(__dirname,"../../config.env")})

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`

function KakaoLoginScreen() {
  const requestToken = async (code) => {
    const requestTokenUrl = 'https://kauth.kakao.com/oauth/token'
    const options = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    })

    try {
      const tokenResponse = await axios.post(requestTokenUrl, options)
      const ACCESS_TOKEN = tokenResponse.data.access_token

      const body = {
        ACCESS_TOKEN,
      }
      const response = await axios.post(REDIRECT_URI, body)
      const value = response.data
      // const result = await storeUser(value);
      // if(result === 'stored'){
      //   const user = await storeUser('user');
      //   dispatchEvent(read_S(user));
      //   await NavigationContainer.navigate('Main');
      // }
    } catch (e) {
      console.log(e)
    }
  }

  const getCode = (target) => {
    const exp = 'code='
    const condition = target.indexOf(exp)
    if (condition != -1) {
      const requestCode = target.substring(condition + exp.length)
      requestToken(requestCode)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url
          getCode(data)
        }}
      />
    </View>
  )
}

export default KakaoLoginScreen
