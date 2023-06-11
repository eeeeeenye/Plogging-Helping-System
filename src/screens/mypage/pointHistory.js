import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPointHistory } from '../../slices/All/point_historyslice';
import Constants from 'expo-constants';

export default function PointHistory() {
  const [dataList, setDataList] = useState([]);
  const userID = useSelector((state) => state.auth.user?.clientID);
  const ip = Constants.manifest.extra.Local_ip;
  const dispatch = useDispatch();
  const pointHistory = useSelector((state) => state.pointHistory);

  useEffect(() => {
    let check = storageCheck();     // 리덕스에 데이터가 저장되어 있는지 확인
    if (!check) {
      getPointHistory();
    } else {
      setDataList(pointHistory);
    }
  }, []);

  const getPointHistory = async () => {     // 최초 실행 시 데이터 가져오기
    try {
      const response = await axios.post(`http://${ip}:3000/point-history/${userID}`);
      const data = response.data;
      dispatch(setPointHistory(data));
      setDataList(data);
    } catch (error) {
      console.log('Error fetching point history:', error);
    }
  };

  const storageCheck = () => {              // 데이터가 있는지 확인
    return pointHistory.length > 0;
  };

  const formatDate = (dateString) => {      // DB에 있는 timestamp 타입을 바꿔줌
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
  };

  return (
    <ScrollView style={styles.container}>
      {dataList.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.points}>{item.points} points</Text>
            <Text style={styles.createdAt}>{formatDate(item.created_at)}</Text>
          </View>
          <Text style={styles.event}>{item.event}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', 
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd', 
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  points: {
    fontSize: 16,
    color: '#888',
  },
  createdAt: {
    fontSize: 14,
    color: '#888',
  },
  event: {
    fontSize: 14,
    color: '#888',
  },
});
