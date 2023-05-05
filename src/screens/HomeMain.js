import React from 'react'
import {WebView} from 'react-native-webview';
import { View } from 'react-native';
import watch from '../addons/Watch'
import Pedometer from '../addons/Pedometer'


const KakaoMapScreen = () =>{
    const apiKey = '093f44ff0baa195ab8c672ddce75f0fd';
    const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
    const html = `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script type="text/javascript" src="${url}"></script>
        </head>
        <body>
            <div id="map" style="width:20==100%;height:70%;"></div>
            <script>
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            </script>
        </body>
        </html>
        `;

    return(
        <View style={{flex:1}}>
            <WebView
            originWhitelist={['*']}
            source={{ html }}
            javaScriptEnabled={true}
            injectedJavaScript={''}
            style={{ flex: 1 }}
            />
            <Watch />
            <Pedometer />
        </View>
    )
}

export default KakaoMapScreen;
