import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import mapPolylineHTML from './htmlCode/mapPlylineHTML';

// 리셋이나 stop하면 이상한 경로 노이즈가 발생함
const LocationTracker = () => {
  const webViewRef = useRef();
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY;
  const status = useSelector((state) => state.stopwatch.isRunning);
  const [reset,resetStatus] =useState({reset:false})

  useEffect(() => {
    console.log(status)
    if (status) {
      startLocationTracking();
    } else {
      resetPath();
    }
  }, [status]);

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({}));
    }
  }, []);

  const handleMessage = (event) => {
    const position = JSON.parse(event.nativeEvent.data);
    console.log('Received position:', position);
  };

  const resetPath = () => {
    if (webViewRef.current) {
      resetStatus({reset : true})
      webViewRef.current.postMessage(JSON.stringify({ reset: true }));
      console.log(JSON.stringify({ reset: true }))
    }
  };

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const listener = (location) => {
        const position = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        sendPositionToWebView(position);
      };

      const subscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 0,
        },
        listener
      );

      // 트래킹을 멈추려면 해당 주석을 수정
      // subscription.remove();
    } catch (error) {
      console.log('Location tracking error:', error);
    }
  };

  const sendPositionToWebView = (position) => {
    const message = JSON.stringify(position);
    if (webViewRef.current) {
      webViewRef.current.postMessage(message);
    }
  };

  
  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={ {html: mapPolylineHTML(apiKey)} }
        onLoad={() => {
          startLocationTracking();
        }}
        onMessage={handleMessage}
        style={styles.webView}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default LocationTracker;




