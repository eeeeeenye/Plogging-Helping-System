// StepCounter.js
import React, { useState, useEffect } from 'react';
import { View,StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';

export default function Distance() {
    const [steps, setSteps] = useState(0);
    const stopwatchState = useSelector((state) => state.stopwatch.isRunning) // Redux 스토어의 stopwatch.isRunning 값 사용
  
    useEffect(() => {
      let subscription;
  
      if (stopwatchState) {
        Accelerometer.setUpdateInterval(1000); // 1초마다 업데이트
  
        const calculateSteps = ({ x, y, z }) => {
          const acceleration = Math.sqrt(x * x + y * y + z * z);
          if (acceleration > 1.2) {
            // 걸음걸이 감지
            setSteps((prevState) => prevState + 1);
          }
        };
  
        Accelerometer.isAvailableAsync().then((available) => {
          if (available) {
            subscription = Accelerometer.addListener(calculateSteps);
          } else {
            console.log('Accelerometer is not available on this device.');
          }
        });
      } else {
        return;
      }
  
      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    }, [stopwatchState]); // stopwatchState가 변경될 때마다 useEffect 재실행
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{steps} KM</Text>
      </View>
    );
  
    
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: 10,
    },
    text: {
      fontSize: 24,
      fontWeight:'bold'
    },
  });

