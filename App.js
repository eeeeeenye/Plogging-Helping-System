import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

//test
import {WebView} from 'react-native-webview'
import {View,Alert,Button} from 'react-native'


const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('hello!!');`;
const html=`
  <div>TEST</div>
  `

const Stack = createStackNavigator()

export default function App() {
  const requestToken = async(code)=>{
    const requestTokenUrl = 'https://kauth.kakao.com/oauth/token'
    const options = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });

    try{
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const ACCESS_TOKEN = tokenResponse.data.access_token;

      const body = {
        ACCESS_TOKEN,
      };
      const response = await axios.post(REDIRECT_URI,body);
      const value = response.data;
      const result = await storeUser(value);
      if(result === 'stored'){
        const user = await storeUser('user');
        dispatchEvent(read_S(user));
        await NavigationContainer.navigate('Main');
      }
    }catch(e){
      console.log(e);
    }
  };


  const getCode = (target)=>{
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if(condition != -1){
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  }

  return (
    // <Provider theme={theme}>
      <View style={{
        backgroundColor:"green",
        height:"100%",
        marginTop:50
      }}>
        <Button style={{marginTop:100, width:"100%", height:"100%"}} title="ddddr"></Button>
        <WebView 
        style={{top:50}}
        source={{html}}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event)=>{ 
        const data = event.nativeEvent.url;
        getComputedStyle(data);} } />
      </View>
      
      
    //   {/* <NavigationContainer>
    //     <Stack.Navigator
    //       initialRouteName="StartScreen"
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //     >
    //       <Stack.Screen name="StartScreen" component={StartScreen} />
    //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    //       <Stack.Screen name="Dashboard" component={Dashboard} />
    //       <Stack.Screen
    //         name="ResetPasswordScreen"
    //         component={ResetPasswordScreen}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer> */}
    // // </Provider>
  )
}
